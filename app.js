const express = require('express');
const app = express();
const PORT=process.env.PORT||3000;
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const categoriesRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const oredrRoutes = require("./routes/order");
const expressSession = require("express-session");
const path = require("path");
const { Session } = require('express-session');
const cookieParser = require("cookie-parser"); 
const passport = require('passport');

require("dotenv").config();
require("./config/db");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
require("./config/google_oauth_config");


app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", oredrRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});