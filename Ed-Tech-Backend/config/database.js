const mongoose = require("mongoose");
require("dotenv").config();


exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        userNewUrlParser: true,
        useUnitfiedTopology: true,
    })
    .then( () => console.log("DB Connected Succesfully"))
    .catch( () => {
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    })
};

