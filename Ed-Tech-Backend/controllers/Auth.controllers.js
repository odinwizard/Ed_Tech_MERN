const User = require("../models/User.models");
const OTP = require("../models/Otp.models");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender.util");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const {otpTemplate} = require("../mail/templates/emailVerificationTemplates")
const Profile = require("../models/Profile.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
                //fetch email from req body
                const {email} = req.body;

                //check if user is already exits or not...

                const checkUserPresent = await User.findOne({email});

                //if user already exits then return a response
                if (checkUserPresent) {
                    return res.status(401).json({
                    success:false,
                    message:'User already registered',
                })
                }
                //generate OTP.......
                var otp = otpGenerator.generate(6, {
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                console.log("Otp generated: ", otp);

                //check unique otp or not
                let result = await OTP.findOne({otp: otp});

                while (result) {                            // this code should be changed.........
                    otp = otpGenerator(6, {
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                    });
                    result = await OTP.findOne({otp: otp});
                }

                const otpPayload = {email, otp};
                //create an entry for otp....
                const otpBody = await OTP.create(otpPayload);
                console.log(otpBody);

                //return response successfully.............
                const emailContent = otpTemplate(otpBody.otp);
                const emailResponse = await mailSender(
                    otpBody.email,
                    "OTP Verification - StudyNotion",
                    emailContent,
                    );

                console.log(emailResponse);

                res.status(200).json({
                    success:true,
                    message:'OTP Sent Successfully',
                    otp,
                })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,

        })
    }

}

exports.signUp = async (req, res) => {
   try {
         //data fetch from request body..........
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;
    //validate the data............

    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status(403).json({
            success:false,
            message:"All fields are mandetory",
        });
    }
    //matching the password and confirmPassword.......
    if (password !== confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"Password and confirmPassword value does not match, please try again",
        });
    }
    //check user is already exits or not..............
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({
            success:false,
            message: "User is already regitered",
        });
    }
    //find most recent OTP stored for the user...........
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);

    //validate the otp..................
    if (recentOtp.length === 0) {
        return res.status(400).json({
            success:false,
            message:'Otp is not valid',
        });
    } else if(otp !== recentOtp[0].otp) {
        //Invalid otp
        return res.status(400).json({
            success: false,
            message:"Invalid OTP",
        });
    }
    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in DB

    const profileDetails = await Profile.create({
        gender:null,
        gender:null,
        dateOfBirth: null,
        about: null,
        contactNumber:null,
    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
        success:true,
        user,
        message:'User is registered successfully',
    });
   } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again",
        })
   }
}

//login.......

exports.login = async (req, res) => {
    try {
       
         //get data from req body
         const {email, password} = req.body;
         //validation data
         if (!email || !password) {
             return res.status(403).json({
                 success:false,
                 message:'All fields are required, please try again',
             });
         }
             // check user exists or not.........
             const user = await User.findOne({ email }).populate("additionalDetails");
             if (!user) {
                 return res.status(401).json({
                     success:false,
                     message:"User is not registered, please signup first",
                 });
             }
             //generate JWT, after password matching..
             if (await bcrypt.compare(password, user.password)) {
                 const payload = {
                     email: user.email,
                     id: user._id,
                     accountType: user.accountType,
                 }
                 const token = jwt.sign(payload, process.env.JWT_SECRET, {
                     expiresIn:"24h",
                 });
                 user.token = token;
                 user.password = undefined;
 
                 //create cookie and send response
                 const options = {
                     expires: new Date(Date.now() + 3*24*60*60*1000),
                     httpOnly: true,
                 }
                 res.cookie("token", token, options).status(200).json({
                     success:true,
                     token,
                     user,
                     message:"Logged in successfully",
                 })
             }
             else {
                 return res.status(401).json({
                     success:false,
                     message:"Password is incorrect",
                 });
             }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login failure, please try again",
        });
    }
}

//changePassword.........

exports.changePassword = async (req, res) => {
    try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}
