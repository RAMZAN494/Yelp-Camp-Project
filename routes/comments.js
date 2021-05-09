var express = require("express");
var router  = express.Router({mergeParams:true});
var Camp    = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../midleware");

//Comment New
router.get("/new", middleware.isLoggedin , function(req,res){

    //FIND BY ID
    Camp.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err)
         } else {
             res.render("comments/new",{campground:campground});
         }
    });
});

//Comment Create
router.post("/",middleware.isLoggedin ,function(req,res){
    //Look Up Campground Using ID
    Camp.findById(req.params.id,function(err,campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else{
            Comment.create(req.body.comment,function(err,comment){
                if (err) {
                    req.flash("error", "Something Went Wrong.");
                    console.log(err)
                } else {
                    //add username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //save the comment
                    campground.comments.push(comment);
                    campground.save()
                    req.flash("success", "Successfully Added Comment.");;
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//EDIT COMMENTS ROUTES....
router.get("/:comment_id/edit", middleware.commentOwnerShip, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundcomment){
        if (err) {
            res.redirect("back");
        } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundcomment});
        }
    })
}); 

//UPDATE COMMENTS ROUTES..
router.put("/:comment_id", middleware.commentOwnerShip, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComent){
        if (err) {
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//DESTROY COMMENT ROUTES... 
router.delete("/:comment_id",middleware.commentOwnerShip, (req,res) =>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted Successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;

