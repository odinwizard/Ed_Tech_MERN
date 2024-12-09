const Course = require("../models/Course.models");
const Tag = require("../models/Tag.models");
const User = require("../models/User.models");
const {uploadImageToCloudinary} = require("../utils/imageUploader.util");

//createCourse handler function

exports.createCourse = async (req, res) => {
    try {
        //fetch data...........
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;
        //get thumbNail............
        const thumbNail = req.files.thumbnailImage;
        //validation.......
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandetory",
            });
        }
        //check for instructor
        
    } catch (error) {
        
    }
}
