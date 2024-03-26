const express = require("express")
const router=express.Router();

const {addCategories, signup, login, getCategories, saveCategories, getUserCategories} = require("../controllers/controller")

router.get("/get-categories",getCategories)
router.get("/user-categories/:userId",getUserCategories)
router.post("/insert",addCategories);
router.post("/signup",signup)
router.post("/login",login)
router.post("/save-categories",saveCategories)

module.exports=router;