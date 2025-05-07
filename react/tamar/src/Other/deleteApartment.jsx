import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import swal from 'sweetalert';
import { getAllApartment, remove } from '../Apartment/api'; 

export const DeleteApartment = () => {
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


        const handleDelete = async () => {
        if (findApartment) {
            try {
                debugger
                if (apartments)
                    {
                        let findApartment1 = apartments.find((element) => element.nameApartment === nameApartment);
                        if(findApartment1){
                            setFindApartment(findApartment1)
                            console.log(findApartment1); 
                            remove(findApartment1._id)
                swal('הדירה נמחקה', 'success');

                        }
                          
                        else {
                            swal('שגיאה', 'אנא הכנס שם דירה חוקי.', 'error');
                         }
                    }
            } catch (error) {
                swal('שגיאה', error.response?.data?.message || 'הייתה שגיאה בביצוע הבקשה.', 'error');
            }   
        }
    };

    return (
        <div className='r' id='rrr'>
            <div className="login-container" id='lll'>
                <h3>מחק דירה:</h3>
                <input
                    type="text"
                    value={nameApartment}
                    onChange={(e) => setNameApartment(e.target.value)}
                    placeholder="הכנס שם דירה"
                />
                <button className='bb' onClick={handleDelete}>מחק דירה</button>
            </div>
        </div>
    );
};

export default DeleteApartment;


