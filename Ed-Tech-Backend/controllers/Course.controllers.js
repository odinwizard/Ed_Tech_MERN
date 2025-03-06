const Course = require("../models/Course.models");
const Category = require("../models/Category.models");
const User = require("../models/User.models");
const {uploadFileToCloudinary} = require("../utils/fileUploader.util");

//createCourse handler function

exports.createCourse = async (req, res) => {
    try {
        //fetch data.......
        let {courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            //tag, 
            category, 
            status, 
            instructions} = req.body;
        //get thumbnail....
        //const thumbnail = req.files.thumbnailImage;
        //validation.......
        if(!courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            // !tag || 
            // !thumbnail || 
            !category) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandetory",
            });
        }
        if(!status || status === undefined) {
            status = "Draft";
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});
        console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }
        //check given Category is valid or not?
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message: "Category Details Not Found",
            });
        }
        //Upload image to cloudinary
        //const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			//tag: tag,
			category: categoryDetails._id,
			//thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        });
        //add the new course to the user schema of instructor.
         await User.findByIdAndUpdate(
            { _id:instructorDetails._id },
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
         );
         //update the Category schema

         //return response
         return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
         });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error: error.message,
        })
    }
};

//getAllCourses handler function....

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                    studentEnrolled:true,
                                                   }).populate("instructor")
                                                     .exec();
                return res.status(200).json({
                    success:true,
                    message:"Data for all couses fetched successfully",
                    data:allCourses,
                })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Can not fetch details",
            error:error.message
        })
    }
}

//getCourse all details...

exports.getCoursesDetails = async (req, res) => {
    try {
        const {courseId} = req.body;
        const courseDetails = await Course.find(
                                {_id:courseId}).populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails",
                                            },
                                        }
                                ).populate("category")
                                 .populate("ratingAndReviews")
                                 .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    },
                                 }).exec();
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
