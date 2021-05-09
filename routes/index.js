var express = require("express");
var router = express.Router();
var passport = require("passport");
var User       = require("../models/user");

//Root Route
router.get("/", function(req, res){
	res.render("landing");
});

//Show Register Form Route
router.get("/register", function(req,res){
    res.render("register");
});

//Handle Login And SignUp
router.post("/register", function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "WelCome To CampGround " + user.username);
            res.redirect("/campgrounds");
        })
    });
});

//Show LogIn Page

router.get("/login", (req,res) => {
    res.render("login");
});

//Handling LogIn Logic

router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req,res){
});

//LogOut Functionality
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged You Out!")
    res.redirect("/campgrounds");
});

/*//MiddleWare
function isLoggedin(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}
*/
module.exports = router;
