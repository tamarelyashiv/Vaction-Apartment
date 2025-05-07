import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { getAllCategory, getAllCity, addApartment } from "../Apartment/api"; // ודא שקריאות ה-API מוגדרות כהלכה
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import "./Style.css";

export const AddApartments = () => {
    const currentAdvertiser = useSelector(x => x.currentAdvertiser);
    const [newAp, setNewAp] = useState({});
    const [listCategory, setListCategory] = useState([]);
    const [listCity, setListCity] = useState([]);

    // משיכת רשימת קטגוריות 
    useEffect(() => {
        getAllCategory()
            .then(x => {
                setListCategory(x.data); // בדיקה אם x.data מוגדר כהלכה
                console.log("nameCategory:", x.data);
                console.log(listCategory);
                
            })
            .catch(err => {
                console.error("Failed to fetch nameCategory:", err.message);
            });
    }, []);

    // משיכת רשימת ערים
    useEffect(() => {
        getAllCity()
            .then(x => {
                setListCity(x.data || []); // בדיקה אם x.data מוגדר כהלכה
                console.log("nameCity:", x.data);
                console.log("listCity: ",listCity)

            })
            .catch(err => {
                console.error("Failed to fetch nameCity:", err.message);
            });
    }, []);

    // הגדרת פרטי המשתמש הנוכחי
    useEffect(() => {
        if (currentAdvertiser && currentAdvertiser._id) {
            setNewAp({ ...newAp, codeAdvertiser: currentAdvertiser._id });        }
       
    }, [currentAdvertiser]);
    console.log("Current Advertiser:", currentAdvertiser);
    // פונקציית שמירה
    const save = () => {
        debugger
        if (newAp.nameApartment && newAp.description && newAp.adress && newAp.Addadditives &&
            newAp.price && newAp.codeCategory && newAp.codeCityA && newAp.numBeds && newAp.picture) {
                console.log("Data being sent to the server:", newAp);
                addApartment(newAp)
                .then(() => {
                    console.log("New Apartment:", newAp);
                    swal("Success", "The apartment was added successfully", "success");
                })
                .catch(err => {
                    console.error("Failed to create apartment:", err);
                    swal("Error", "Unable to create the apartment", "error");
                });
        } else {
            swal("Error", "Please fill in all fields", "error");
        }
    };

    return (
        <>
        <div className='allAdd'>
            <div id="alladdcar">
                <br />
                <h1>נא להכניס את פרטי הדירה:</h1>
                {/* <br /> */}
                <div id="addcar">
                    <TextField
                        label="הכנס שם"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, nameApartment: e.target.value })}
                    />
                    <p></p>

                    <TextField
                        label="הכנס תיאור"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, description: e.target.value })}
                    />
                    <p></p>

                    <TextField
                        label="הכנס כתובת"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, adress: e.target.value })}
                    />
                    <p></p>

                    <TextField
                        label="עוד"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, Addadditives: e.target.value })}
                    />
                    <p></p>
                  

                    <TextField
                        label="מספר מיטות"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, numBeds: e.target.value })}
                    />
                    <p></p>
                   
                    <TextField
                        label="הכנס מחיר"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, price: e.target.value })}
                    />
                    <p></p>
                    <p></p>
                   
                    <TextField
                        label="הכנס תמונה"
                        variant="outlined"
                        onBlur={(e) => setNewAp({ ...newAp, picture: e.target.value })}
                    />
                    <p></p>
                    <select
                        className="select"
                        onBlur={(e) => setNewAp({ ...newAp, codeCityA: e.target.value })}
                    >
                        <option disabled selected>בחר עיר</option>
                        {listCity.map((item, index) => 
                            <option key={index} value={item._id}>
                                {item.nameCity}
                            </option>
                        )}
                    </select>
                    <p></p>
                    <select
                        className="select"
                        onBlur={(e) => setNewAp({...newAp, codeCategory: e.target.value })}
                    >
                        <option disabled selected>בחר קטגוריה</option>
                        {listCategory.map((item, index) => 
                            <option key={index} value={item._id}>
                                {item.nameCategory}
                            </option>
                        )}
                    </select>
                    <p></p>

                    <Button
                        className="buto"
                        onClick={save}
                        variant="contained"
                        endIcon={<SendIcon />}
                    >
                        הוסף
                    </Button>
                </div>
            </div>
            </div>
        </>
    );
};
export default AddApartments;