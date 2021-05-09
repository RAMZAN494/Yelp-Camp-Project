var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"), 
    Camp           = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seed")

//Requiring Routes 
    var commentRoutes    = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        authRoutes       = require("./routes/index")

mongoose.connect('mongodb://localhost:27017/camp_11', {useNewUrlParser: true, useUnifiedTopology: true});;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
/*seedDB();*/

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:"Wellcome To The Yelp Camp",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

 /*Camp.create(
 {
 	name:"Multan", 
 	image:"https://images.unsplash.com/photo-1598461814968-639d9321f483?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80",
    description:"Multan Is My Favourite City& Beautiful City."
 }
 , function(err, camp){
 	if(err){
 		console.log("There Is An Error In The DataBase....");
 		console.log(err);
 	}else{
 		console.log("Blah Blah...");
 		console.log(camp);
 	}
 });*/

app.listen(5000, function(){
	console.log("Server Has Benn Started!!!");
});