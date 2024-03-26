// const { Client } = require('pg');
// require('dotenv').config();

// const client = new Client({
//   connectionString: process.env.DB_CONNECTION
// });

// async function createTables() {
//     try {
//         await client.connect();

//         // Create users table
//         await client.query(`
//             CREATE TABLE IF NOT EXISTS users (
//                 id SERIAL PRIMARY KEY,
//                 username VARCHAR(50) UNIQUE NOT NULL,
//                 email VARCHAR(255) UNIQUE NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//             );
//         `);

//         // Create categories table
//         await client.query(`
//             CREATE TABLE IF NOT EXISTS categories (
//                 id SERIAL PRIMARY KEY,
//                 name VARCHAR(100) UNIQUE NOT NULL
//             );
//         `);

//         // Create user_categories table to track selected categories for each user
//         await client.query(`
//             CREATE TABLE IF NOT EXISTS user_categories (
//                 id SERIAL PRIMARY KEY,
//                 user_id INTEGER REFERENCES users(id),
//                 category_id INTEGER REFERENCES categories(id),
//                 CONSTRAINT user_category_unique UNIQUE (user_id, category_id)
//             );
//         `);

//         console.log("Tables created successfully.");
//     } catch (error) {
//         console.error("Error creating tables:", error);
//     } finally {
//         await client.end();
//     }
// }

// createTables();

const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance with PostgreSQL
const sequelize = new Sequelize(process.env.DB_CONNECTION, {
    dialect: 'postgres',
    logging: false // Disable logging for production
});

// Authenticate the connection
sequelize.authenticate()
    .then(() => {
        console.log('DB Connected Successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize instance
module.exports = sequelize;
