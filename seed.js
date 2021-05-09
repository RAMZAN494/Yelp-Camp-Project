const mongoose      = require("mongoose");
const Campground    = require("./models/campground");
const Comment       = require("./models/comment");

const data =[
	{
	  name:"Cloud Rest",
	  image:"https://images.unsplash.com/photo-1595361316014-d4e3f86aa26d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGFraXN0YW4lMjBjaXR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
	},
	{
		name:"Night Moon",
		image:"https://images.unsplash.com/photo-1587520375529-2e2a1d38e392?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGFraXN0YW4lMjBjaXR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 

	},
	{
		name:"Desert Fort",
		image:"https://images.unsplash.com/photo-1582456820700-60cf466f541f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cGFraXN0YW4lMjBjaXR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	    description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 

	}
]

function seedDB(){
		Campground.deleteMany({}, function(err){
		if (err){
			console.log(err);
		}else{
			console.log("Campgrounds Removed");
		}
		// Add A Few Campgrouds...
		data.forEach(function(seed){
			Campground.create(seed,function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("New Camp Created!");
					// Create A COmment
					Comment.create(
					{
						text: "This IS A Good Place But No Internet",
						author:"Ramzan Bhutta"
					} , function(err , comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
						    campground.save();
						    console.log("Created new Comment!");
						}

					})
				}

			});
		});
    });

}
module.exports = seedDB;
