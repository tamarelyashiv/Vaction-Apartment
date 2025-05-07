import express from "express"
import{getAllCategory,addCategory}from "../controllers/category.js";
import { checkAuth } from "../middleWare.js";

const router=express.Router()
router.get('',getAllCategory)
 router.post('',addCategory)
export default router