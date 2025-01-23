const mongoose =require('mongoose')
const Campground =require('../models/campground')
const { places,descriptors } = require('./seedHelpers')
const cities = require('./cities')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
	console.log("database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20)+10;
        const camp =new Campground({
            author:'674ebe6e07d1df9f97a1f0ce',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
           // image:`https://picsum.photos/400?random=${Math.random()}`,
            description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime totam sit expedita, optio iste asperiores qui at, repellendus velit, commodi quaerat quos voluptas earum eius quidem nemo perferendis tempora minima!`,
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images: [
                {
                url: 'https://res.cloudinary.com/dlulkzppy/image/upload/YelpCamp/vmp1rm8mouncyfsq5gyb.jpg',
                    filename: 'YelpCamp/vmp1rm8mouncyfsq5gyb'
                 
                },
                {
                  url: 'https://res.cloudinary.com/dlulkzppy/image/upload/YelpCamp/cae8tdwdqph0raom2gtz.jpg',
                    filename: 'YelpCamp/cae8tdwdqph0raom2gtz'
                 
                }
              ]
        })
        await camp.save();
    }
    
}
seedDB().then(() =>{
    mongoose.connection.close();
})