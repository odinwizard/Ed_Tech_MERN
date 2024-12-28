const Profile = require("../models/Profile.models");
const User = require("../models/User.models");
const { uploadFileToCloudinary } = require("../utils/fileUploader.util");


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {dateOfBirth="", about="", contactNumber } = req.body;
        //get userId
        const id = req.user.id;
        //validation
        // if(!contactNumber || !gender || !id) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"All fields are required"
        //     });
        // }
        //find profile
        const userDetails = await User.findById(id);
        //const profileId = userDetails.additionalDetails;
        const profile = await Profile.findById(userDetails.additionalDetails);
        //update profile
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.gender = gender;
        profile.contactNumber = contactNumber;
        await profile.save();
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profile,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById({_id: id});
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delet profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delet user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User cannot deleted",
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userDetails,
        });


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

