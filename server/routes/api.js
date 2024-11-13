import express from 'express';
import { getRestaurants, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Add routes here

// Route for handling post requests

router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body; 
    const createdRestaurant = createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant);
});

// Route for handling delete requests

router.delete('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id); 
    const deletedRestaurant = deleteRestaurant(restaurantId);
    res.status(204).json(deletedRestaurant);
});


export {router as backendRouter};