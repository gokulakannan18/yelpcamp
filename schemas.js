const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})

/*
if(process.env.NODE_ENV != "production"){
	require('dotenv').config()
}

const express = require('express')
const path = require('path')
const mongoose =require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const ExpressError=require('./utils/ExpressError')
const methodOverride = require('method-override')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User = require('./models/user')

const mongoSanitize=require('express-mongo-sanitize')

const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes= require('./routes/reviews')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
	console.log("database connected");
})
const app = express();
app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(mongoSanitize())
app.use(mongoSanitize({
	replaceWith: '_'
}))





const sessionConfig = {
	secret:'thisshouldbeabettersecret',
	resave:false,
	saveUninitialized:true,
	cookies:{
		httpOnly:true,
		expires:Date.now()+1000*60*60*24*7,
		maxAge:1000*60*60*24*7
	}
}
app.use(session(sessionConfig))
app.use(flash()) 

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
	console.log(req.query);
	res.locals.currentUser=req.user;
	res.locals.success=req.flash('success')
	res.locals.error=req.flash('error')
	next();
})





app.use('/',userRoutes)
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/reviews',reviewRoutes)

app.get('/',(req,res)=>{
	res.render('home')
})

app.all('*',(req,res,next)=>{
	next(new ExpressError('Page not found',404));
})
app.use((err,req,res,next)=>{
	const { statusCode=500} =err;
	if(!err.message) err.message = 'oh no,something went wrong';
	res.status(statusCode).render('error',{err})
})
app.listen(3000,()=>{
	console.log('Serving on port 3000')
})
*/
//https://github.com/gokulakannan18/yelpcamp.git