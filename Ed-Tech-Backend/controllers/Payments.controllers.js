const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course.models");
const User = require("../models/User.models");
const mailSender = require("../utils/mailSender.util");
//const {courseEnrollmentEmail} = require("../")


//capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseId
    if(!course_id) {
        return res.json({
            success:false,
            message:"Please provide valid course id",
        })
    };
    //valid courseDetails
    let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success: false,
                    message:"Could not find the course",
                });
            }
             //user already pay for the same course
             const uid = mongoose.Types.ObjectId(userId);
             if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:true,
                    message:"Student is already enrolled",
                });
             }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message: error.message,
            })
        }
   
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId,
        }
    };
    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(payment(Response));
         //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message:"Could not initiate order",
        });
    }
};

//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    try {
        const webhooksecret = "12345678";

        const signature = req.headers["x-razorpay-signature"]

        //..be continue..
    } catch (error) {
        
    }
}