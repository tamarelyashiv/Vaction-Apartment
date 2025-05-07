import { useEffect, useState } from "react"
import { getByIdApartment } from "./api.js"
import "../Other/Style.css"
export const Details = ({ id }) => {
  const [Apartment, setApartment] = useState()

      useEffect(() => {
        debugger
          getByIdApartment(id)
              .then(x => {
                  console.log(x.data);
                  setApartment(x.data)
              })
              .catch(err=>{
                console.log(err)})
      }, [id])


   return (Apartment && <div>
      <div className='allDetails'>
         <div className='car-container'>
            <div className='image'>
               <img 
                  className='i' 
               />
            </div>
            <div className='details'>
               <label>דירה: {Apartment.nameApartment}</label>
               <label>תאור: {Apartment.description}</label>
               <label>קטגוריה: {Apartment.codeCategory && <h1>{Apartment.codeCategory.nameCategory}</h1>}</label>
               <label>עיר: {Apartment.codeCityA && <h1>{Apartment.codeCityA.nameCity}</h1>}</label>
               <label>כתובת: {Apartment.adress}</label>
               <label>כמות מיטות: {Apartment.numBeds}</label>
               <label>תוספים: {Apartment.Addadditives}</label>
               <label>מחיר: {Apartment.price}</label>
               <label>דואר אלקטרוני: {Apartment.codeAdvertiser && <h1>{Apartment.codeAdvertiser.email}</h1>}
               </label>

            </div>
         </div>
      </div>
      </div>);
}
    