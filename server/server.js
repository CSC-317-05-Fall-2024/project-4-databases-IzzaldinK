import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import restaurants from './data/restaurants.js';
import { getRestaurants, getRestaurant, createRestaurant,deleteRestaurant,getReviewsForRestaurant } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';


const app = express();
const PORT = process.env.PORT || 3000;



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mounting api router

app.use('/api', backendRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/restaurants', async (req, res) => {
    const restaurantsData = await getRestaurants();
    res.render('restaurants', {restaurants: restaurantsData });
});

app.get('/restaurants/:id', async (req,res) => {
    const restaurantId = req.params.id;
    const restaurant = await getRestaurant(restaurantId);
    res.render('restaurant-details', {restaurant});
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Testing functions

// console.log(getRestaurants());
// console.log(getRestaurant(1));
// console.log(createRestaurant({  "name": "Reunion Kitchen","phone": "(714) 283-1062",
//     "address": "5775 E Santa Ana Canyon Rd, Anaheim, California",
//     "photo": "/images/reunion Kitchen.jpg"}));

// console.log(createRestaurant({  "name": "Izaldin Kitchen","phone": "(714) 283-1062",
//         "address": "5775 E Santa Ana Canyon Rd, Anaheim, California",
//         "photo": "/images/reunion Kitchen.jpg"}));


// console.log(deleteRestaurant(6));

console.log(getReviewsForRestaurant(2));

