const RatingAndReview = require("../models/RatingAndReview.models");
const Course = require("../models/Course.models");

//createRating
exports.createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                            {id: courseId,
                                studentEnrolled: {$elemMatch: {$eq: userId} },
                            });
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            });
        }
        //check if user already reviewd the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                user:userId,
                                course:courseId,
        });
        if(alreadyReviewed) {
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }
        //create rating review
        const ratingReview = await RatingAndReview.create({
                                    rating, review,
                                    course: courseId,
                                    user:userId,
        });
        //update course with update drating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                {
                                    $push:{
                                        ratingAndReviews: ratingReview._id,
                                    }
                                },
                                {new:true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
                success:true,
                message:"Rating and Review created Successfully",
                ratingReview,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAverageRating
exports.getAvarageRating = async (req, res) => {
    try {
        //....tobe continue..
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRating