import * as React from 'react';
import { getAllApartment, getAllCity, getByCityId } from "../Apartment/api"; // ודא שקריאות ה-API מוגדרות כהלכה
import { useEffect, useState } from "react";
import swal from "sweetalert";
import "./Style.css";
import { useNavigate } from 'react-router';


export const GetByCity = () => {
        const [listApartment, setListApartment] = useState([]);
        const [listCity, setListCity] = useState([]);
        const [apartments, setApartments] = useState([])

        debugger
    
 useEffect(() => {
        const getApartments = async () => {
            let a
            try {
                a = await getAllApartment()
                debugger
                setApartments(a.data)
            }
            catch (eror) {
                console.log(eror);
            }
        }
        getAllCity()
                    .then(x => {
                        setListCity(x.data || []); // בדיקה אם x.data מוגדר כהלכה
                        console.log("nameCity:", x.data);
                        console.log("listCity: ",listCity)
                    })
                    .catch(err => {
                        console.error("Failed to fetch nameCity:", err.message);
                    });
        getApartments()
    }, []);


    return(
        <>
        <p></p>
        <select
        className="select"
        onBlur={(e) => getByCityId({codeCityA: e.target.value })}
        >
        <option disabled selected>בחר עיר</option>
        {listCity.map((item, index) => 
        <option key={index} value={item._id}>
        {item.nameCity}
        </option>
         )}
        </select>
        <p></p>
        </>
    )
}
