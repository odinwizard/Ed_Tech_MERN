const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course.models");
const User = require("../models/User.models");
const mailSender = require("../utils/mailSender.util");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");

//capture Payment

exports.capturePayment = async (req, res) => {

    const {courses} = req.body;
    console.log("This is from capture payment", courses);
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({
            success: false,
            message:"Please provide Course Id"
        });
    }
    let totalAmount = 0;
    // let uid;
    // uid = new mongoose.Types.ObjectId(userId);
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Could not find the course"
                });
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already purchase the course"
                })
            }
            totalAmount += course.price;


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message: error.message
            });
        }
        
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("This is payment response", paymentResponse);
        res.json({
            success:true,
            data:paymentResponse,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false, 
            message:"Could not Initiate Order"
        });
    }

}
//payment verification.

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id ||
        !razorpay_payment_id || !razorpay_signature || !courses || !userId
    ) {
        return res.status(200).json({
            success: false,
            message: 'Payment Failed'
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
            if (expectedSignature === razorpay_signature) {
                 await enrollStudents(courses, userId, res)
                return res.status(200).json({
                    success:true,
                    message: "Payment Verified"
                });
            }
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        });     
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;
    console.log("From Send payment successfull", orderId, paymentId, amount, userId);
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
    }
    try {
        //student findout
        const enrollStudent = await User.findById(userId);
        await mailSender(
            enrollStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrollStudent.firstName} ${enrollStudent.lastName}`,
                amount/100,
                orderId, 
                paymentId
            )
        )
    } catch (error) {
        console.log("Error in sending mail", error);
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        });
    }
}


const enrollStudents = async(courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide data for Courses or UserId"
        });
    }
    for(const courseId of courses) {
       try {
             //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {$push:{studentEnrolled:userId}},
            {new:true},
        )
        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"Course not Found",
            })
        }
        //find the student and add the course to their list of enrolledcourses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
                                                        {
                                                            $push:{
                                                                courses: courseId,
                                                            }
                                                        },
                                                        {new:true});
        //send mail to students
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `Successfully enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`),
        )
        console.log("Email send successfull ", emailResponse.response);
       } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            })
       }
    }
}






// //capture the payment and initiate the Razorpay order

// exports.capturePayment = async (req, res) => {
//     //get courseId and userId
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseId
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:"Please provide valid course id",
//         })
//     };
//     //valid courseDetails
//     let course;
//         try {
//             course = await Course.findById(course_id);
//             if(!course) {
//                 return res.json({
//                     success: false,
//                     message:"Could not find the course",
//                 });
//             }
//              //user already pay for the same course
//              const uid = mongoose.Types.ObjectId(userId);
//              if(course.studentEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success:true,
//                     message:"Student is already enrolled",
//                 });
//              }
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message: error.message,
//             })
//         }
   
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             courseId: course_id,
//             userId,
//         }
//     };
//     try {
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(payment(Response));
//          //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     } catch (error) {
//         console.error(error);
//         res.json({
//             success: false,
//             message:"Could not initiate order",
//         });
//     }
// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
   
//         const webhooksecret = "12345678";

//         const signature = req.headers["x-razorpay-signature"]

//         const shasum = crypto.createHmac("sha256", webhooksecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if(signature === digest) {
//             console.log("Payment is authorised");
//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             try {
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                             {_id: courseId},
//                                             {$push:{studentsEnrolled:userId}},
//                                             {new:true}
//                 );
//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:"Course not found",
//                     });
//                 }
//                 console.log(enrolledCourse);
//                 //find the student added bthe course to their list enrolled courses
//                 const enrolledStudent = await User.findByIdAndUpdate(
//                                         {_id:userId},
//                                         {$push:{courses:courseId}},
//                                         {new:true},
//                 );
//                 console.log(enrolledStudent);

//                 // send the mail
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congradulations, you are enrolled",

//                 );
//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success: true,
//                     message:"Signature verified and Course added",
//                 })
//             } catch (error) {
//                 console.error(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 })
//             }
//         }
//         else {
//             return res.status(400).json({
//                 success:false,
//                 message:"Invalid request",
//             })
//         };
 
// };
