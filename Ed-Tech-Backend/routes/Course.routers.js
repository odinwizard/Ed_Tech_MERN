const express = require("express")
const router = express.Router();
//import course controllers
const {createCourse, getAllCourses, getCoursesDetais} = require("../controllers/Course.controllers");
//import categories controllers
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category.controllers");
//import section controllers
const{createSection, updateSection, deleteSection} = require("../controllers/Section.controller");
//import sub-section controllers
const {createSubsection, updateSubSection, deleteSubSection} = require("../controllers/Subsection.controller");
//import ratingand reviews controllers
const {createRating, getAvarageRating, getAllRatingAndReviews} = require("../controllers/RatingAndReviews.controllers");
//import middlewares
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

//for course route..
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCoursesDetais);

//for category routes
//Category can Only be Created by Admin

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

//for rating and reviews..
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);

module.exports = router;
