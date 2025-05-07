import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import "./Style.css";
import { AddCategory } from "../Apartment/api"
import { useNavigate } from 'react-router';
export const AddCategories = () => {
  
  const [nameCategory, setCategory] = useState('');
  const navigate=useNavigate()
  

  useEffect(() => {
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
      const $this = $(this),
            label = $this.prev('label');

      if (e.type === 'keyup') {
        label.toggleClass('active highlight', $this.val() !== '');
      } else if (e.type === 'blur') {
        label.toggleClass('highlight', $this.val() !== '');
      } else if (e.type === 'focus') {
        label.toggleClass('highlight', $this.val() !== '');
      }
    });

    $('.tab a').on('click', function (e) {
      e.preventDefault();
      $(this).parent().addClass('active').siblings().removeClass('active');
      const target = $(this).attr('href');
      $('.tab-content > div').not(target).hide();
      $(target).fadeIn(600);
    });

  }, []);

  const add = async (e) => {
    e.preventDefault();

    // כאן אתה צריך להשתמש בערכים מה-state
    const category = {nameCategory};

    try {
      const response = await AddCategory(category);
      console.log(response.data);
      navigate('/HomePage')
    } catch (error) {
      console.error("Error saving data:", error);
      alert("הקטגוריה קיימת")
    }
  }

  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab active"><a href="#signup">הוספת קטגוריה</a></li>
        {/* <li className="tab"><a href="#login">Log In</a></li> */}
      </ul>

      <div className="tab-content">
        <div id="signup">   
          <form onSubmit={add}>
          
              <div className="field-wrap">
                <label>שם קטגוריה: <span className="req">*</span></label>
                <input type="text" required autoComplete="off" onChange={(e) => setCategory(e.target.value)} />
              </div>

            <button type="submit" className="button button-block">הוסף</button>
          </form>
        </div>

        
      </div>
    </div>
  );
}
