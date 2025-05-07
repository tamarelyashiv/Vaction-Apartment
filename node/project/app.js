import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import ApartmentRouter from './api/routers/Apartment.js'
import categoryRouter from './api/routers/category.js'
import CityRouter from './api/routers/City.js'
import AdvertiserRouter from './api/routers/Advertiser.js'
import cors from 'cors'

const app = express()
const port =3001
app.use(bodyParser.json())
app.use(cors())

// uri - מחרוזת חיבור למסד נתונים
// mongodb://localhost:27017
mongoose.connect(`mongodb://localhost:27017/Articles_DB`)
    .then(() => {
        console.log('connect to mongoDB!👍😊');
    })
    .catch(err => {
        console.log({ error: err.message });
    })
// app.use('/Apartment',Apartment)
app.use('/City', CityRouter)
 app.use('/Advertiser',AdvertiserRouter)
 app.use('/category', categoryRouter)
 app.use('/Apartment',ApartmentRouter)
app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
