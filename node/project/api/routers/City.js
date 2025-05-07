import express from "express"
import{addCity, getAllCity}from "../controllers/City.js";
import { checkAuth } from "../middleWare.js";

//הוספה
// import { categoryExists } from "";
const router=express.Router()
router.get('',getAllCity)
router.post('',addCity)

export default router