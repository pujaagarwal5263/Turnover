const { DataTypes } = require('sequelize');
const  sequelize  = require("../db-connection");

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: false });

module.exports = Category;