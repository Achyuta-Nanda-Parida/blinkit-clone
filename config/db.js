const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(function(){
    console.log("connected to the database");
});

module.exports = mongoose.connection;