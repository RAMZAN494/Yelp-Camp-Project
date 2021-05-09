var Camp    = require("../models/campground");
var Comment = require("../models/comment");

//ALL THE MIDDLEWARE GOES HERE....
var middlewareObj = {}

//
middlewareObj.campgroundOwnerShip = function campgroundOwnerShip(req,res,next){
     if (req.isAuthenticated()) { 
        Camp.findById(req.params.id, function(err, foundCamp){
            if (err) {
                req.flash("error", "Campground Not Found.");
                res.redirect("back");
            } else {
                //does user own the campground
                if (foundCamp.author.id.equals(req.user._id)) {
                   next();
                } else {
                    req.flash("error", "You Don't Have Permission To Do That.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In To Do That.");
        res.redirect("back");
    }
}

//
middlewareObj.commentOwnerShip = function commentOwnerShip(req,res,next){
     if (req.isAuthenticated()) { 
        Comment.findById(req.params.comment_id, function(err, foundcomment){
            if (err) {
                res.redirect("back");
            } else {
                //does user own the comment
                if (foundcomment.author.id.equals(req.user._id)) {
                   next();
                } else {
                    req.flash("error", "You Don't Have Permission To Do That.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In To Do That.");
        res.redirect("back");
    }
} 

//
middlewareObj.isLoggedin = function isLoggedin(req,res,next){
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error", "You Need To Be LoggedIn To Do That.");
    res.redirect("/login");
}



module.exports = middlewareObj;