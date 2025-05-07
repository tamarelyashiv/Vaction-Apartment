import category from "../models/category.js"
//שליפת כל הקטגוריות
export const getAllCategory=(req,res)=>{
    category.find().then(data=>
    {
        res.status(200).send(data)
    }
    )
    .catch(err=>{

        res.status(500).send({error:err.message});
        
    })
}
// export const addCategory = (req, res) => {
//     const { nameCategory} = req.body
//         // ניצור משתמש חדש עם המכיל רק את הנתונים שרצינו
//         const c= new category({
//             nameCategory,
//         })
     
//         // נוסיף אותו למערך
//       c.save().then(category=>{
//         res.status(200).send({message:`add category ${category._id } succeed`})

//       })
//        .catch(error=>{
//         res.status(500).send({error:error.message})
//        })
   
// }


export const addCategory = (req, res) => {
    const { nameCategory } = req.body;
    category.findOne({ nameCategory })
    .then(existingCategory => {
        if (existingCategory) {
            return res.status(400).send({ error: 'הקטגוריה כבר קיימת' });
        }
        
        const c = new category({ nameCategory });
        return c.save();
    })
    .then(category => {
        // וודא שלא נשלחה תגובה קודם לכן
        if (!res.headersSent) {
            res.status(200).send({ message: `הוספת העיר ${category._id} הצליחה` });
        }
    })
    .catch(error => {
        // וודא שלא נשלחה תגובה קודם לכן
        if (!res.headersSent) {
            res.status(500).send({ error: error.message });
        }
    });
}