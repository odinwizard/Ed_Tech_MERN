const Category = require("../models/Category.models");

//create Category handler function..
exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const {name, description} = req.body;
        //validation
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message:"All fields are required",
            })
        }
        //create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success: true,
            message:"Category created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//getAllCategorys........

exports.showAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({}, {name:true, description:true});
        return res.status(200).json({
            success: true,
            message:"All Categorys return successfully",
            allCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//CategoryPage details...
exports.categoryPageDetails = async (req, res) => {
    try {
        //get category Id
        const {categoryId} = req.body;
        //get couses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("course")
                                                .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }
        //get courses for different categories
        const differentCategories = await Category.find({
                                            _id: {$ne: categoryId},
        }).populate("course").exec();
        //get top selling courses
        //todo
        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}