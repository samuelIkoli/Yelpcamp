const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100);
        const camp = new Campground({
            author: '61ac92907a599f1348a00d4f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1639661848/YelpCamp/wp31euxqfqos0zlwcefv.jpg',
                    filename: 'YelpCamp/wp31euxqfqos0zlwcefv',
                },
                {
                    url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1639661848/YelpCamp/mq5kdvbc4qsm6pxum6wc.jpg',
                    filename: 'YelpCamp/mq5kdvbc4qsm6pxum6wc',
                },
                {
                    url: 'https://res.cloudinary.com/dwjtu9ags/image/upload/v1639661848/YelpCamp/qeta5w0rfbyy9jxqhvjc.jpg',
                    filename: 'YelpCamp/qeta5w0rfbyy9jxqhvjc',
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit consequuntur blanditiis laudantium, qui distinctio assumenda provident dolore officiis tempore voluptas est ratione in libero et reprehenderit fugit modi placeat molestiae.',
            price
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })
    .catch((e) => { console.log(e) });