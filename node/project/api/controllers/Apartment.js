// import Apartment from "./models/Apartment.js"
import Apartment from "../models/Apartment.js"
import Advertiser from "../models/Advertiser.js"
import City from "../models/City.js"
import category from "../models/category.js"
//עדכון:
// export const update = (req, res) => {
//     const { id } = req.params
//     // אם רוצים לעדכן קטגוריה
//     // נרצה לבדוק שהקוד החדש קיים
//     // הפעלנו מידלוור

//     Apartment.findByIdAndUpdate(id, req.body, { new: true })
//         // בברירת מחדל - מחזיר את האובייקט לפני השינוי
//         // בשביל לשנות את ברירת המחדל - מוסיפה אובייקט אפשרויות
//         // שמכיל את ההגדרה: { new: true }
//         .then(apartment => {
//             res.status(200).send({ message: `update apartment ${apartment._id} succeed!`, apartment })
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })
// }

// //מחיקה
// export const remove = (req, res) => {

//     const { id } = req.params

//     Apartment.findByIdAndDelete(id)
//         .then(apartment => {
//             res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })

// }
export const remove = (req, res) => {
    const { id } = req.params;
    Apartment.findByIdAndDelete(id)
        .then(async apartment => {
            const advertiserId = apartment.codeAdvertiser;
            const CityId=apartment.codeCityA
            const categoryId=apartment.codeCategory
            // מנסה לעדכן את המפרסם ומסיר את ה-ID של הדירה ממערך הדירות
            try {
                const updateResult1 = await Advertiser.findByIdAndUpdate(advertiserId, { $pull: { apartments: apartment._id } });
                const updateResult2 = await City.findByIdAndUpdate(CityId, { $pull: { apartments: apartment._id } });
                const updateResult3 = await category.findByIdAndUpdate(categoryId, { $pull: { apartments: apartment._id } });
                if (!updateResult1 && updateResult2 && updateResult3) {
                    return res.status(500).send({ message: `Delete apartment ${apartment._id} succeeded! But update others things failed!` });
                }
                res.status(200).send({ message: `Delete apartment ${apartment._id} succeeded!` });
            } catch (error) {
                return res.status(500).send({ message: `Update failed: ${error.message}` });
            }
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}


// export const remove = (req, res) => {

//     const { id } = req.params

//     Apartment.findByIdAndDelete(id)
//         .then(async apartment => {
//             let x = await Advertiser.findByIdAndUpdate(apartment.Advertiser, { $pull: { apartments: apartment._id } })
//             if (!x) {
//                 return res.status(500).send({ message: `delete apartment ${apartment._id} succeed! update advertiser failed!` });
//             }
//             res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })        })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })

// }

export const update = (req, res) => {

    const { id } = req.params

    // אם רוצים לעדכן קטגוריה
    // נרצה לבדוק שהקוד החדש קיים
    // הפעלנו מידלוור

    // const { numBeds, description, name } = req.body

    // // בדיקות

    // const parameters = {
    //     numBeds,
    //     description,
    //     name
    // }

    Article.findByIdAndUpdate(id, req.body
        // , { new: true }
    )
        // בברירת מחדל - מחזיר את האובייקט לפני השינוי
        // בשביל לשנות את ברירת המחדל - מוסיפה אובייקט אפשרויות
        // שמכיל את ההגדרה: { new: true }
        .then(async article => {
            // עדכון
            if (req.body.category) {
                let x = await category.findByIdAndUpdate(req.body.category, { $push: { articles: article._id } })
                let y = await category.findByIdAndUpdate(article.category, { $pull: { articles: article._id } })
                if (!x || !y) {
                    return res.status(200).send({ message: `update article ${article._id} succeed! update categories failed!` })
                }
            }
            res.status(200).send({ message: `update article ${article._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

} 


export const addApartment = async (req, res) => {
    const {
        nameApartment,
        description,
        picture,
        codeCategory,
        codeCityA,
        adress,
        numBeds,
        Addadditives,
        price,
        codeAdvertiser
    } = req.body;

    try {
        // יצירת דירה חדשה
        const newApartment = new Apartment({
            nameApartment,
            description,
            picture,
            codeCategory,
            codeCityA,
            adress,
            numBeds,
            Addadditives,
            price,
            codeAdvertiser
        });

        const savedApartment = await newApartment.save();

        // עדכון קטגוריה
        await category.findByIdAndUpdate(
            codeCategory,
            { $push: { apartments: savedApartment._id } },
            // { new: true } // מחזיר את האובייקט המעודכן (אופציונלי)
        );

        // עדכון עיר
        await City.findByIdAndUpdate(
            codeCityA,
            { $push: { apartments: savedApartment._id } },
            // { new: true }
        );

        // עדכון משווק
        await Advertiser.findByIdAndUpdate(
            codeAdvertiser,
            { $push: { apartments: savedApartment._id } },
            // { new: true }
        );

        res.status(201).json(savedApartment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getAllApartment = (req, res) => {
    // שליפה של כל המאמרים
    // find 
    Apartment.find()
        // .populate - join
        // select שליפת ערכים של מפתח זר - כל האובייקט אלא אם כן הפעלונו סינון באמצעות 
        // מקבל שדה שהוא מפתח זר
        // .populate('category')
        .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
        // בעת הצלחה
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את המערך שחזר מהשליפה - כל המאמרים
        .then(list => {
            res.status(200).send(list)
        })
        // בעת כשלון
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את הנתונים על השגיאה
        .catch(err => {
            res.status(403).send({ error: err.message })
            console.log(err)
        })
}

export const getByIdApartment = (req, res) => {
    // שליפה של מאמר לפי קוד - מפתח ראשי
    // findById
    Apartment.findById(req.params.id)
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
    // בעת הצלחה
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את המערך שחזר מהשליפה - כל המאמרים
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: `apartment not found!` })
            }
            res.status(200).send(apartment)
        })
        // בעת כשלון
        // הפונקציה הפנימית מקבלת פרמטר שמכיל את הנתונים על השגיאה
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCategoryId = (req, res) => {
    Apartment.find({codeCategory : req.params.id})
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
    .then(category => {
            res.status(200).send(category.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCityId = (req, res) => {
    Apartment.find({codeCityA : req.params.id})
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
    .then(City => {
            res.status(200).send(City)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByAdvertiserId = (req, res) => {
    Advertiser.findById(req.params.id)
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
    .then(Advertiser => {
            res.status(200).send(Advertiser.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//שליפת כל הדירות

export const getWhereBeds = (req, res) => {
    Apartment.find()
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
        .where({
            $and: [
                { numBeds: { $gte: req.params.id } },
            ]
        })
        .then(beds => {
            res.status(200).send({ beds })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
export const getWherePrice = (req, res) => {
    Apartment.find()
    .populate({ path: 'codeCategory', select:'nameCategory'}).populate({ path: 'codeCityA',select:'nameCity' }).populate({ path: 'codeAdvertiser' })
        .where({
            $and: [
                { price: { $lte:  req.params.id } },
            ]
        })
        .then(price => {
            res.status(200).send({ price })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}