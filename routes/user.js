const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userConstrollers = require("../controllers/users.js");
const user = require("../models/user.js");

router
    .route("/signup")
    .get(userConstrollers.renderSignup)
    .post(wrapAsync(userConstrollers.signup));
       
router
    .route("/login")
    .get(userConstrollers.renderLogin)
    .post(
        saveRedirectUrl,   
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login"
        }),
        userConstrollers.login
    );



router.get("/logout", userConstrollers.logout);

module.exports = router;