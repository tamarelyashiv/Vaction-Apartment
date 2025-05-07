import express from "express"
import{getByIdApartment,getAllApartment, remove,update,addApartment,getByCategoryId,getByCityId,getByAdvertiserId,getWhereBeds,getWherePrice} from "../controllers/Apartment.js";
import { ApartmentExists, checkAuth } from "../middleWare.js";

const router=express.Router()
router.get('',getAllApartment)
router.get('/:id',getByIdApartment)
router.post('',addApartment)
router.delete('/:id',ApartmentExists,checkAuth,remove)
router.patch('/:id',ApartmentExists,checkAuth,update)
router.get('/byCategory/:id',getByCategoryId)
router.get('/getByCityId/:id',getByCityId)
router.get('/getWhereBeds/:id',getWhereBeds)
router.get('/getWherePrice/:id',getWherePrice)
router.get('/getByAdvertiserId/:id',checkAuth,getByAdvertiserId)


export default router

