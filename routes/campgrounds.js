var express = require("express");
var router = express.Router();
var Camp    = require("../models/campground");
var middleware = require("../midleware");


//Index... Show All Campsground..
router.get("/", function(req,res){
	// Get All Camp Ground In The DB
 Camp.find({}, function(err, allCampgrounds){
 	if (err) {
 		console.log(err);
 	}else{
 		res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
 	}
 });

});

//Create.... Add New CampGround In The Database
router.post("/",middleware.isLoggedin,function(req,res){
    //get data from the form and add to the campground array...
	var name = req.body.name;
    var price = req.body.price;
	var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
	var newGround = {name:name , price:price , image:image, description:desc, author:author};
//  Create New CampGround And Save To DB....
    Camp.create(newGround, function(err, newCreated){
    	if (err) {
    		console.log(err);
    	}else{
    		//Redirect Back To CampGround.....
	        res.redirect("/campgrounds");
    	}
    });

});

//New -- Show Form To add new campground
router.get("/new",middleware.isLoggedin ,function(req,res){
	res.render("campgrounds/new");
});

// Show - show more info about one campground.
router.get("/:id", function(req,res){
    //Find The Campground With given Id....
    Camp.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err);
        } else {
          /*  console.log(foundCamp);*/
            //render show template campground..
             res.render("campgrounds/show", {campground:foundCamp});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.campgroundOwnerShip, (req,res) => {
        Camp.findById(req.params.id, function(err, foundCamp){
            res.render("campgrounds/edit", {campground:foundCamp});
     }); 
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.campgroundOwnerShip, function(req,res){
    //find and update the correct campground
    Camp.findByIdAndUpdate(req.params.id,req.body.campground, function(err, updated){
        if (err) {
            res.redirect("/campgrounds");
        }else {
            //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.campgroundOwnerShip, function(req,res){
    Camp.findByIdAndDelete(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds"); 
        }
    })
})





module.exports = router;
