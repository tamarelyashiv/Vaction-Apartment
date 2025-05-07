import { useEffect, useState } from "react"
import { getAllApartment, getAllCategory, getAllCity, getByCityId,getByCategoryId } from "./api.js"
import { Cards } from "./Cards.jsx"
import { Details } from "./Details.jsx"
import { useSelector } from 'react-redux';


export const HomePage = () => {
    const [select, setSelect] = useState({})
    const [listCity, setListCity] = useState([]);
    const [apartments, setApartments] = useState([])
    const [listCategory, setListCategory] = useState([]);
    const [code, setCode] = useState('')
    const [codeCategory, setCodeCategory] = useState('')


    useEffect(() => {
        debugger
        const getApartments = async () => {
            let a
            try {
                console.log(code);
                
                debugger
                if (code) {
                    a = await getByCityId(code)
                    debugger
                    console.log(a.data);

                    setApartments(a.data)
                }
                else if(codeCategory){
                    a = await getByCategoryId(codeCategory)
                    debugger
                    console.log(a.data);

                    setApartments(a.data)
                }
                else 
                {
                    a = await getAllApartment()
                    debugger
                    console.log(a.data);
                    setApartments(a.data)
                }
            }
            catch (eror) {
                console.log(eror);
            }

        }
        getApartments()
        let c;
        getAllCity()
            .then(x => {
                c=x.data;
                setListCity(x.data || []); // בדיקה אם x.data מוגדר כהלכה
                console.log("nameCity:", x.data);
                console.log("listCity: ", listCity)
            })
            .catch(err => {
                console.error("Failed to fetch nameCity:", err.message);
            });
            getAllCategory()
            .then(x=>{
                c=x.data;
                setListCategory(x.data || []); // בדיקה אם x.data מוגדר כהלכה
                console.log("nameCategory:", x.data);
                console.log("listCategory: ", listCategory)

            })
        
    }, [code,codeCategory]);
    const show = (id) => {
        setSelect(id)
    }

    return <>
    <div class="fixed-div">  <p>לסינון לפי עיר בחרו בעיר הרצויה</p>
                <select
                    className="select"
                    onChange={(e) => setCode(e.target.value)}
                >
                    <option disabled selected>בחר עיר</option>
                    {listCity.map((item, index) =>
                        <option key={index} value={item._id}>
                            {item.nameCity}
                        </option>
                    )}
                </select>
                <p></p> 
                <img src={`${process.env.PUBLIC_URL}/picture/logo.png`} id='logo'></img>

                </div>
        <div className="homepage">
            <div className="cards">
              

                {/* <select
                    className="select"
                    onChange={(e) => setCodeCategory(e.target.value)}
                >
                    <option disabled selected>בחר קטגוריה</option>
                    {listCategory.map((item, index) =>
                        <option key={index} value={item._id}>
                            {item.nameCategory}
                        </option>
                    )}
                </select>
                <p></p> */}

                {apartments.map(x => <Cards Apartment={x} show={show}></Cards>)}
            </div>
        </div>
    </>
}