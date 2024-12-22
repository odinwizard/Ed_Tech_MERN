const express = require("express");
const router = express.Router();
//Import required controllers and middleware functions
const {login, signUp, sendOTP, changePassword} = require("../controllers/Auth.controllers");
const {resetPasswordToken, resetPassword} = require("../controllers/Resetpassword.controllers");
const {auth} = require("../middlewares/auth");


//Authentication Routes...........
//for login
router.post("/login", login);
//for signup
router.post("/signup", signUp);
//for sending otp
router.post("/sendotp", sendOTP);
//for changing the password
router.post("/changepassword", auth, changePassword);

//reset Password routes
//for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);
//for resetting user's password after verification
router.post("/reset-password", resetPassword);

//Exports..
module.exports = router;