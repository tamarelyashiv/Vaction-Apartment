import express from "express"
import{login, register}from "../controllers/Advertiser.js";
import { getAllApartment } from "../controllers/Apartment.js";
import { checkAuth } from "../middleWare.js";
//הוספה
// import { categoryExists } from "";
const router=express.Router()
 router.get('',getAllApartment)
router.post('/register',register)
router.post('/login',login)
export default router