const Profile = require("../models/Profile.models");
const User = require("../models/User.models");


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile
        
        //return response
    } catch (error) {
        
    }
};