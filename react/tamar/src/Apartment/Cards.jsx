import React, { useEffect } from "react";
import "../Other/Style.css"
import { useState } from "react";
import { getAllApartment, getAllCity, getByCityId } from "./api";

export const Cards = ({ Apartment, show }) => {

    return (<>
        <div className="bodyCard">
        <div className="card" onClick={() => show(Apartment._id)}>
                 <div id="container"> 
                <div className="product-details">
                    <p className="information">{Apartment.description}</p>
                    <div className="control">
                        <button className="btn">
                            <span className="shopping-cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                        </button>
                    </div>
                </div>        
                <div className="product-image">
                    <img src={Apartment.picture}></img>
                    <div className="info">
                        <h2>{Apartment.nameApartment}</h2>
                        <ul>
                            <li><strong>מחיר </strong>{Apartment.price}</li>
                            <li><strong>מספר מיטות: </strong>{Apartment.numBeds}</li>
                            <li><strong>קטגוריה: </strong>{Apartment.codeCategory && Apartment.codeCategory.nameCategory}</li>
                            <li><strong>עיר: </strong>{Apartment.codeCityA && Apartment.codeCityA.nameCity}</li>
                            <li><strong>טלפון מפרסם: </strong>{Apartment.codeAdvertiser && Apartment.codeAdvertiser.phone}</li>
                            <li><strong>כתובת: </strong>{Apartment.adress}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </>);
};
