const mongoose = require("mongoose");
require("dotenv").config();


const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connection successfully");
    } catch (error) {
        console.error("could not connect DATABASE", error);
        console.log(error);
    }
}

module.exports = connectionDB;

