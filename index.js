const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/Users");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const AdminController = require("./controllers/AdminController");
const Utils = require("./config/Utils");

require("./middlewares/Passport")(passport);

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://dev1:fc4lPjd6JFSAfDib@cluster0.ggbfo.mongodb.net/PrivacyDashboard"
);

require("dotenv").config();

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("view cache", false);

app.use(
  require("express-session")({
    secret: "My Secret Key",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false, maxAge: 3600000 },
  })
);

app.locals.title = "Privacy Dashboard";
app.locals.siteUrl = Utils.getSiteUrl();

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Route handling

// Auth routes
require("./routes/Auth")(app, passport);
// Auth routes

// Protected routes
require("./routes/Protected")(app, isLoggedIn);
// Protected routes

// 404 route
app.get("*", function (req, res) {
  res.render("admin/404");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Server setup
app.listen(8080, () => {
  console.log("server listening on port 8080");
});
