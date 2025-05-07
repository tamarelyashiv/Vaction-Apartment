import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import "./Style.css";
import { register } from "../Apartment/api";
import { login } from "../Apartment/api";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentAdvertiser } from './actoin'
import { useNavigate } from 'react-router';



export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [morePhone, setMorePhone] = useState('');
  const currentAdvertiser = useSelector(myStore => myStore.currentAdvertiser)
  const dispatch = useDispatch();
  const nav = useNavigate();



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
    const advertiser = { email, password, phone, morePhone };
    try {
      debugger
      const response = await register(advertiser);
      console.log(response.data);
      await dispatch(setCurrentAdvertiser(response.data.advertisers))
       console.log("token",response.data.token);
       localStorage.setItem("token",response.data.token)

       nav("/HomePage");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

 const login1 = async (e) => {
    e.preventDefault();
    const advertiser = { email, password };
    try {
        const response = await login(advertiser);
        

        console.log(response.data);
        await dispatch(setCurrentAdvertiser(response.data.advertiser))
        console.log(currentAdvertiser.token)
        console.log(currentAdvertiser)
        localStorage.setItem("token",response.data.token)
        nav("/HomePage");
    } catch (error) {
        console.error("Error advertiser not exist:", error);
        // alert("מפרסם לא קיים יש לעבור להתחברות")
    }
}
console.log({currentAdvertiser});


  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab active"><a href="#signup">להרשמה</a></li>
        <li className="tab"><a href="#login">להתחברות</a></li>
      </ul>

      <div className="tab-content">
        <div id="signup">
          <h1>הרשמה בחינם</h1>
          <form onSubmit={add}>
            <div className="top-row">
              <div className="field-wrap">
                <label>דואר אלקטרוני<span className="req">*</span></label>
                <input type="email" required autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="field-wrap">
                <label>הכנס סיסמה<span className="req">*</span></label>
                <input type="password" required autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div className="field-wrap">
              <label>מספר טלפון<span className="req">*</span></label>
              <input type="text" required autoComplete="off" onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="field-wrap">
              <label>טלפון נוסף<span className="req">*</span></label>
              <input type="text" required autoComplete="off" onChange={(e) => setMorePhone(e.target.value)} />
            </div>
            <button type="submit" className="button button-block">הרשמה</button>
          </form>
        </div>

        <div id="login">
          <h1>ברוך השב</h1>
          <form onSubmit={login1}>
            <div className="field-wrap">
              <label>דואר אלקטרוני<span className="req">*</span></label>
              <input type="email" required autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="field-wrap">
              <label>סיסמה<span className="req">*</span></label>
              <input type="password" required autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" className="button button-block">התחברות</button>
          </form>
        </div>
      </div>
    </div>
  );
}