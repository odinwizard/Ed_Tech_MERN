const Section = require("../models/Section.models");
const Course = require("../models/Course.models");

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
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                        courseId,
                                        {
                                            $push:{
                                                courseContent:newSection._id,
                                            }
                                        },
                                    {new:true},                                    
                               )
        //use populate to replace sections and sub sections both in the updatedcoursedetails
        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
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
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        const section = await Section.findByIdAndDelete(sectionId, {sectionName}, {new:true});

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            section,
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
        const {sectionId} = req.params;
        await Section.findByIdAndDelete(sectionId);
        //Testing: do we need to delete the entry from the course schema?
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        })
    }
}