import City from "../models/City.js"
//שליפת כל הערים
export const getAllCity=(req,res)=>{
    City.find().then(data=>
    {
        res.status(200).send(data)
    }
    )
    .catch(err=>{
        res.status(500).send({error:err.message});
    })
}
//הוספת עיר
export const addCity = (req, res) => {
    const { nameCity } = req.body;

    // בדוק אם העיר כבר קיימת
    City.findOne({ nameCity })
        .then(existingCity => {
            if (existingCity) {
                if (!res.headersSent) {
                    return res.status(400).send({ error: 'העיר כבר קיימת' });
                }
            }

            // אם העיר לא קיימת, ניצור עיר חדשה
            const c = new City({
                nameCity,
            });

            return c.save();
        })
        .then(city => {
            if (!res.headersSent) {
                res.status(200).send({ message: `הוספת העיר ${city._id} הצליחה` });
            }
        })
        .catch(error => {
            if (!res.headersSent) {
                res.status(500).send({ error: error.message });
            }
        });
}

