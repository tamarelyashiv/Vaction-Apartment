import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { getAllApartment, update } from '../Apartment/api';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import swal from "sweetalert";
import "./Style.css";

export const UpdateApartment = () => {
    const currentAdvertiser = useSelector(x => x.currentAdvertiser);
    const [upap, setUpap] = useState({});
    const [nameApartment, setNameApartment] = useState('');
    const [apartments, setApartments] = useState([])
    const [findApartment, setFindApartment] = useState('null');

    // הגדרת פרטי המשתמש הנוכחי
    useEffect(() => {
        if (currentAdvertiser && currentAdvertiser._id) {
            setUpap({ ...upap, codeAdvertiser: currentAdvertiser._id });
        }
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
        getApartments()
    }, [currentAdvertiser]);

    console.log("Current Advertiser:", currentAdvertiser);    
    const [currentApartment, setCurrentApartment] = useState({}); // הוסף סטייט לשמירת הדירה הנוכחית

const handleUpdate = async () => {
    if (findApartment) {
        try {
            if (apartments) {
                let findApartment1 = apartments.find((element) => element.nameApartment === nameApartment);
                if (findApartment1) {
                    setFindApartment(findApartment1);
                    setCurrentApartment(findApartment1); // שמור את הדירה הנוכחית
                } else {
                    swal('שגיאה', 'אנא הכנס שם דירה חוקי.', 'error');
                }
            }
        } catch (error) {
            swal('שגיאה', error.response?.data?.message || 'הייתה שגיאה בביצוע הבקשה.', 'error');
        }
    }
};

const save = () => {
    const updatedApartment = {
        ...currentApartment, // שמור את הערכים הנוכחיים
        ...upap // עדכן רק את הערכים שהמשתמש שינה
    };

    console.log(updatedApartment);
    
    update(findApartment._id, updatedApartment)
        .then(() => {
            console.log("update Apartment:", updatedApartment);
            swal("Success", "The apartment was updated successfully", "success");
        })
        .catch(err => {
            console.error("Failed to update apartment:", err);
            swal("Error", "Unable to update the apartment", "error");
        });
};


    return (
        <>

            <div className='r' id='rrr'>
                <div className="login-container" id='lll'>
                    <h3>עדכן דירה:</h3>
                    <input
                        type="text"
                        value={nameApartment}
                        onChange={(e) => setNameApartment(e.target.value)}
                        placeholder="הכנס שם דירה"
                    />
                    <button onClick={handleUpdate}>עדכן דירה</button>
                </div>
            </div>

                <div id="alladdcar">
                    <br />
                    <h1>נא להכניס את פרטי הדירה מעודכנים:</h1>
                    <br />

                    <div id="addcar">
                        <TextField
                            label={findApartment?.nameApartment+"   שם דירה"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, nameApartment: e.target.value })}
                        />
                        <p></p>

                        <TextField
                            label={findApartment?.description+"   תאור דירה"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, description: e.target.value })}
                        />
                        <p></p>

                        <TextField
                            label={findApartment?.Addadditives+"    עוד"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, Addadditives: e.target.value })}
                        />
                        <p></p>

                        <TextField
                            label={findApartment?.numBeds+"    מספר מיטות"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, numBeds: e.target.value })}
                        />
                        <p></p>

                        <TextField
                            label={findApartment?.price+"    מחיר"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, price: e.target.value })}
                        />
                        <p></p>
                        <TextField
                            label={findApartment?.picture+"    תמונה"}
                            variant="outlined"
                            onBlur={(e) => setUpap({ ...upap, picture: e.target.value })}
                        />
                        <p></p>
                        <Button
                            className="buto"
                            onClick={save}
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            שלח
                        </Button>
                    </div>
                </div>
        </>
    );
};

