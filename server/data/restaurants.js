import {pool} from '../config/database.js';

// let restaurantData = [
//     {
//         "id": 0,
//         "name": "Reunion Kitchen",
//         "phone": "(714) 283-1062",
//         "address": "5775 E Santa Ana Canyon Rd, Anaheim, California",
//         "photo": "/images/reunion Kitchen.jpg"
//     },
//     {
//         "id": 1,
//         "name": "Craft by Smoke and Fire",
//         "phone": "(714) 603-7194",
//         "address": "195 W Center St Promenade, Anaheim, California",
//         "photo": "/images/Craft by Smoke and Fire.jpg"
//     },
//     {
//         "id": 2,
//         "name": "MasalaCraft",
//         "phone": "(714) 406-4314",
//         "address": "575 W Chapman Ave, Anaheim, California",
//         "photo": "/images/masalacraft.jpg"
//     },
//     {
//         "id": 3,
//         "name": "Anaheim White House",
//         "phone": "(714) 772-1381",
//         "address": "887 S Anaheim Blvd, Anaheim, California",
//         "photo": "/images/whitehouse.jpg"
//     },
//     {
//         "id": 4,
//         "name": "Luna Grill",
//         "phone": "(714) 922-6985",
//         "address": "121 E Katella Ave Suite 10, Anaheim, California",
//         "photo": "/images/LunaGrill.jpg"
//     },
//     {
//         "id": 5,
//         "name": "Roy's Restaurant",
//         "phone": "(714) 776-7697",
//         "address": "321 W Katella Ave, Anaheim, California",
//         "photo": "/images/roysrestaurant.jpg"
//     }
// ];

// let lastId = restaurantData.length;

// const getNextId = () => {
//     lastId += 1;
//     return lastId;
// }

// Get a list of restaurants
const getRestaurants = async () => {
    try {
        const query = 'SELECT * FROM restaurants';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error(error.message);
    }
};


// Get a restaurant by id
const getRestaurant = async (id) => {
    try {
        const query = 'SELECT * FROM restaurants WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0]; 
    } catch (error) {
        console.error(error.message);
    }
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    try {
        const { name, phone, address, photo } = newRestaurant;
        const query = `
            INSERT INTO restaurants (name, phone, address, photo) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const result = await pool.query(query, [name, phone, address, photo]);
        return result.rows[0]; 
    } catch (error) {
        console.error(error.message);
    }
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    try {
        const query = 'DELETE FROM restaurants WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0]; 
    } catch (error) {
        console.error(error.message);
    }
};

const getReviewsForRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
    return result.rows;
};


// export default { restaurantData };

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant };

