const { DataTypes } = require('sequelize');
const sequelize = require("../db-connection");

const UserCategory = sequelize.define("user_categories", {
      selected_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
},{ timestamps: false });

module.exports = UserCategory;