const Section = require("../models/Section.models");
const Course = require("../models/Course.models");
const SubSection = require("../models/SubSection.models");




exports.createSection = async (req, res) => {
    try {
        //data fetched
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectID
        await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                        },
                                    {new:true},                                    
                               )
         const returnValue = await Course.findById(courseId).populate("instructor").populate("category").populate("courseContent").exec();
        //use populate to replace sections and sub sections both in the updatedcoursedetails
        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            returnValue,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create section try again",
        });
    }
}

exports.updateSection = async (req, res) => {
    try {
        const {sectionName, sectionId , courseId} = req.body;

        const section = await Section.findByIdAndUpdate(
            sectionId, 
            {sectionName}, 
            {new:true});
        
        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        return res.status(200).json({
            success:true,
            message: section,
            data: course,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update section try again",
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const {sectionId , courseId} = req.body;
        await Course.findByIdAndUpdate(courseId , {
             $pull: {
                courseContent: sectionId,
             }
        });
        const section = await Section.findById(sectionId);
        if(!section) {
            return res.status(404).json({
                success:false,
                message:"Section not found",
            });
        }
        //delete subsection
        await SubSection.deleteMany({_id:{$in:section.subSection}});
        await Section.findByIdAndDelete(sectionId);
        //find the updated course and return
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();            
        //Testing: do we need to delete the entry from the course schema?
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data: course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        })
    }
}
