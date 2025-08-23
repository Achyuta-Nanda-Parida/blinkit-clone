var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { name } = require('ejs');
const { userModel } = require("../model/user");
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
    let user =  await userModel.findOne({ email:profile.emails[0].value });

    if(!user){
       user = new userModel({
        name: profile.displayName,
        email: profile.emails[0].value
       });

      await user.save();
    }
    cb(null, user);

    } catch (err) {
      cb(err, false);
    }
    }
  )
);

//When we save our information in Google, it stores it using a specific name or ID that is unique......
//When we save our information in Google, it assigns a unique name or ID to identify the user.....
passport.serializeUser(function(user, cb){
   return cb(null, user._id);
})

//When we save our information in Google, it stores it using a specific name or ID 
//  then deserializeUser give the information about this id or specific name

passport.deserializeUser(async function(id, cb){
let user =  await userModel.findOne({_id:id});
  return cb(null, user);
});

module.exports = passport;