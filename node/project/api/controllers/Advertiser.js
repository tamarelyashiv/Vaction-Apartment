import Advertiser from "../models/Advertiser.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
//  const bcrypt = require('bcrypt');

// export const login =async (req, res) => {
//     // שליפה מאובייקט ג'סון לפי שם מפתח
//     const { email, password } = req.body
//     Advertiser.find()
//         .where({ email: { $eq: email } })
//         .then(async advertiser => {
//             if (advertiser.length == 0) {
//                 console.log('email not found!');
//                 return res.status(404).send({ error: `email and password are not match!` })
//             }
//             let [a] = advertiser
//             if (a.password !== password) {
//                 console.log('password is not match!');
//                 return res.status(404).send({ error: `email and password are not match!` })
//             }

//             // create token
//             // מקבלת שלשה פרמטרים:
//             // 1. נתונים של המשתמש שנכנס
//             // 2. מחרוזת יחודית למערכת
//             // 3. אובייקט אפשרויות - ניתן להגדיר תוקף לטוקן
//             // בשביל לתפוס את הטוקן שנוצר שלא יחזור אובייקט ריק await הגדרנו 
//             // async מסיבה זו הוצרכנו להגדיר על הפונקציה החיצונית - שמפעילה את יצירת הטוקן
//             const token = await jwt.sign(
//                 { email: a.email},
//                 'HT2yg75FXgfvy',
//                 {
//                     expiresIn: '1h'
//                 }
//             )

//             res.status(200).send({ a, token })

//         })
//         .catch(err => {
//             res.status(500).send({error: err.message })
//         })
// }
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const advertiser = await Advertiser.findOne({ email: email });
        if (!advertiser) {
            console.log('email not found!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const isMatch = await bcrypt.compare(password, advertiser.password);
        if (!isMatch) {
            console.log('password is not match!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const token = await jwt.sign(
            { email: advertiser.email },
            'HT2yg75FXgfvy',
            { expiresIn: '1h' }
        );

        res.status(200).send({ advertiser, token });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
export const register = (req, res) => {
    const { email, password, phone, morePhone } = req.body;

    // בדוק אם הסיסמה לא ריקה
    if (!password) {
        return res.status(400).send({ error: 'Password is required' });
    }

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertiser => {
            if (advertiser.length > 0) {
                return res.status(400).send({ error: 'email exists' });
            }

            // יצירת סוללה והצפנת הסיסמה
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).send({ error: err.message });
                    }
                    const newAdvertiser = new Advertiser({
                        email,
                        password: hashedPassword, // שמירת הסיסמה המוצפנת
                        phone,
                        morePhone
                    });
                    newAdvertiser.save()
                        .then(async advertisers => {
                            const token = await jwt.sign({
                                email, phone: advertisers.phone, morePhone: advertisers.morePhone
                            }, 'HT2yg75FXgfvy', {
                                expiresIn: '1h', // hours
                            });
                            res.status(200).send({ advertisers, token });
                        })
                        .catch(err => {
                            res.status(500).send({ error: err.message });
                        });
                });
            });
        });
}
