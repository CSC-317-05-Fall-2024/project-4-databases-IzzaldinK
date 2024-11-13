/* Initialize the data in the DB */
import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {  
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
                name TEXT NOT NULL, 
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT
            );
        `;
        await pool.query(createTableQuery);

        const createReviewsTableQuery = `
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                content TEXT,
                restaurant_id INT,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createReviewsTableQuery);

    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
        
    try {

        const restaurantData = [
            { name: 'Reunion Kitchen', phone: '(714) 283-1062', address: '5775 E Santa Ana Canyon Rd, Anaheim, California', photo: '/images/reunion Kitchen.jpg' },
            { name: 'Craft by Smoke and Fire', phone: '(714) 603-7194', address: '195 W Center St Promenade, Anaheim, California', photo: '/images/Craft by Smoke and Fire.jpg' },
            { name: 'MasalaCraft', phone: '(714) 406-4314', address: '575 W Chapman Ave, Anaheim, California', photo: '/images/masalacraft.jpg' },
            { name: 'Anaheim White House', phone: '(714) 772-1381', address: '887 S Anaheim Blvd, Anaheim, California', photo: '/images/whitehouse.jpg' },
            { name: 'Luna Grill', phone: '(714) 922-6985', address: '121 E Katella Ave Suite 10, Anaheim, California', photo: '/images/LunaGrill.jpg' },
            { name: "Roy's Restaurant", phone: "(714) 776-7697", address: "321 W Katella Ave, Anaheim, California", photo: "/images/roysrestaurant.jpg" }
        ];

        for (const restaurant of restaurantData) {
            const insertQuery = `
                INSERT INTO restaurants (name, phone, address, photo)
                VALUES ($1, $2, $3, $4)
            `;
            await pool.query(insertQuery, [
                restaurant.name,
                restaurant.phone,
                restaurant.address,
                restaurant.photo,
            ]);
        }

        const reviews = [
            { rating: 5, content: "Food is good highly recommend", restaurant_id: 2 },
            { rating: 4, content: "Will come again", restaurant_id: 2 },
            { rating: 2, content: "Food was a little to cold", restaurant_id: 1 },
            { rating: 5, content: "I went with my friends will go again", restaurant_id: 3 }
        ];

        for (const review of reviews) {
            const insertReviewQuery = `
                INSERT INTO reviews (rating, content, restaurant_id)
                VALUES ($1, $2, $3)
            `;
            await pool.query(insertReviewQuery, [
                review.rating,
                review.content,
                review.restaurant_id
            ]);
        }

        console.log('inserted data');
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
