// import city from ''

import Apartment from "./models/Apartment.js"
import jwt, { decode } from 'jsonwebtoken'
export const ApartmentExists = (req, res, next) => {
    const {apartment } = req.body

    if (!apartment && req.method == 'PATCH' ||req.method == 'DELETE') {
        return next()
    }

    Apartment.findById(apartment)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: `apartment not found!` })
            }
            next()
        })
        .catch(error => {
            return res.status(500).send({ error: error.message })
        })
}

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // Authorization - הרשאה
        return res.status(401).send('Authorization failed!')
    }
    console.log(authHeader)
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    
    if (!token) {
        return res.status(401).send('Authorization failed!')
    }
    jwt.verify(token,'HT2yg75FXgfvy', (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send('Authentication failed!');
        }
        next();
    });
}
