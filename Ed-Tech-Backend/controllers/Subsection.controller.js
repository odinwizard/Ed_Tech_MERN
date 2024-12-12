const Subsection = require("../models/SubSection.models");
const Section = require("../models/Section.models");
const { uploadFileToCloudinary } = require("../utils/fileUploader.util");


exports.createSubsection = async (req, res) => {
    try {
        //fetch data from req body
        const {sectionId, title, timeDuration, description} = req.body;
        //extract file/video
        const video = req.files.vidoFiles;
        //validation
        if(!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub-section
        const subSectionDetails = await Subsection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section
        const updatedSection = await Section.findByIdAndUpdate(
                                        {_id:sectionId},
                                        {$push: {
                                            Subsection:subSectionDetails._id,
                                        }},
                                        {new:true}).populate('Subsection');
        //log updated section with adding populate query
        //log updated section
        console.log(updatedSection);
        //return response
        return res.status(200).json({
            success:true,
            message:"sub-section added successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

//update subsection
//delet subsection