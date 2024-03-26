const User = require("./userSchema")
const Category = require("./categorySchema")
const UserCategory = require("./userCategory")

User.belongsToMany(Category, { through: UserCategory });
Category.belongsToMany(User, { through: UserCategory });