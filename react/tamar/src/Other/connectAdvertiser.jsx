import React from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
// import './Home.css'
export const ConnectAdvertiser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    debugger
    const advertiser = useSelector(x => x.currentUser);
    console.log({advertiser});

    const update = () => {
        navigate('/updateApartment')
    }
    const deleteApartment = () => {
        navigate('/deleteApartment')
    }
    const addApartment = () => {
        navigate('/addApartment')
    }
    const addCity = () => {
        navigate('/addCity')
    }
    const addCategory = () => {
        navigate('/addCategory')
    }


    return <>
    <div className="connect">
            <button className="bb" onClick={addApartment}> הוספת דירה</button> 
            <button className="bb" onClick={deleteApartment}> מחיקת דירה</button>
            <button className="bb" onClick={update}>עדכון דירה</button>
            <button className="bb" onClick={addCity}> הוספת עיר</button>
            <button className="bb" onClick={addCategory}> הוספת קטגוריה</button><br></br>
    </div>
    </>
}
