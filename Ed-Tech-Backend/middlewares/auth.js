const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User.models");

exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token
                             || req.body.token   
                             || req.header("Authorisation").replace("Bearer", "");
        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        //Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
        }
    } catch (error) {
       return res.status(401).json({
        success:false,
        message:"something went worng while validating the token",
       }) ;
    }
}
//isStudent
exports.isStudent = async (req, res, next) {
    
}

