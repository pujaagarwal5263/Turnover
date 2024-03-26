const User = require("../models/userSchema")
const Category = require('../models/categorySchema');
const UserCategory = require("../models/userCategory")
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UniqueConstraintError } = require('sequelize');
require('dotenv').config();

const addCategories = async (req, res) => {
    try {
        const categories = [];

        // Generate 100 random category names using Faker.js
        for (let i = 0; i < 100; i++) {
            categories.push({
                name: faker.commerce.department(),
            });
        }

        // Insert categories into the database
        await Category.bulkCreate(categories);

        return res.status(200).json({ message: "Categories inserted successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Could not insert categories" })
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(422).json({ message: "Please enter all required field(s)." })
        }
        // Validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: "Please enter a valid email address." });
        }

        //checking for existing user
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        //hashing password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user in the database
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const { id, username: newUserUsername, email: newUserEmail } = newUser;
        return res.status(201).json({ message: "User created successfully", user: { id, username: newUserUsername, email: newUserEmail } });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Could not create user" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ message: "Please enter email and password." });
        }

        // Find the user with the provided email
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // If password matches, generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });

        // Return success response with token
        return res.status(200).json({ message: "Login successful", token: token, userId: user.id });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ message: "Could not log in" });
    }
};

const getCategories = async (req, res) => {
    try {
        // Parse page number and limit from request query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        // Calculate offset (number of categories to skip)
        const offset = (page - 1) * limit;

        // Query the database to fetch categories with pagination
        const categories = await Category.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        // Calculate total pages
        const totalPages = Math.ceil(categories.count / limit);

        // Return categories and pagination metadata in the response
        return res.status(200).json({
            categories: categories.rows,
            totalPages: totalPages,
            currentPage: page,
            totalCategories: categories.count,
        });
    } catch (err) {
        console.error("Error fetching categories:", err);
        return res.status(500).json({ message: "Could not fetch categories" });
    }
};

const saveCategories = async (req, res) => {
    try {
        const { userId, selectedCategories } = req.body;

        // Validate the userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the selected categories
        const categories = await Category.findAll({ where: { id: selectedCategories } });
        if (categories.length !== selectedCategories.length) {
            return res.status(400).json({ message: "Invalid category IDs" });
        }

        // Associate the selected categories with the user
        await user.setCategories(categories);

        // Return success response
        return res.status(200).json({ message: "Categories selected successfully" });
    } catch (err) {
        console.error("Error selecting categories:", err);
        return res.status(500).json({ message: "Could not select categories" });
    }
}

const getUserCategories = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find user categories for the given userId
        const userCategories = await UserCategory.findAll({
            where: { userId: userId },
            attributes: ['categoryId'] // Select only categoryId column
        });

        // Extract category IDs from the fetched user categories
        const categoryIds = userCategories.map(userCategory => userCategory.categoryId);

        // Fetch category names based on category IDs
        const categories = await Category.findAll({
            where: { id: categoryIds },
            attributes: ['id', 'name'] // Select only id and name columns
        });

        // Return the category names in the response
        return res.status(200).json({ userId: userId, selectedCategories: categories });
    } catch (err) {
        console.error("Error fetching user-selected categories:", err);
        return res.status(500).json({ message: "Could not fetch user-selected categories" });
    }
}

module.exports = { addCategories, signup, login, getCategories, saveCategories, getUserCategories }

