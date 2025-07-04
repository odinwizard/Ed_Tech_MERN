import toast from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiconnector";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve)=> {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        //load script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }
        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                            {courses},
                                        {
                                            Authorization: `Bearer ${token}`,
                                        });
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
         console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data.data);
        //options
        //console.log("Razorpay key", process.env.REACT_APP_RAZORPAY_KEY)
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response) {
                //send successfull message
                // let paymentToken = token;
                //  const paymentData = {
                //     razorpay_order_id: orderResponse.data.data.id, // manually included
                //     razorpay_payment_id: response.razorpay_payment_id,
                //     //razorpay_signature: response.razorpay_signature,
                //     };
                console.log("Response inside handler: ", response)
               sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                //verifyPayment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
        toast.error("Oops! Payment Failed.")
        console.log(response.error)
        })


    } catch (error) {
        console.log("PAYMENT API ERROR ...." , error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment ....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        } )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfull, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

async function sendPaymentSuccessEmail(response, amount, token) {
     if (!token) {
        console.error("Token is missing!"); // 🚨 Debug
        return;
    }
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API ,
             {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      }, {
            Authorization: `Bearer ${token}`,
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


