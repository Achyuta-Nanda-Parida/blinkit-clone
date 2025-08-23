const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL).then(function(){
    console.log("connected to the database");
});

module.exports = mongoose.connection;