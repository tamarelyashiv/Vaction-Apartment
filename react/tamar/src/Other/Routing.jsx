import { Route, Routes } from "react-router"
import { HomePage } from "../Apartment/HomePage"
import { Login } from "./Login"
import { AddCategories } from "../Other/getByCategory"
import { AddCities } from "../Other/getCity"
import { AddApartments } from "./addApartment"
import { GetByCity } from "./getByCity"
import DeleteApartment from "./deleteApartment"
import { UpdateApartment } from "./updateApartment"
import { ConnectAdvertiser } from "./connectAdvertiser"


export const Routing = () => {
    return <>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
            <Route path="/Login" element={<Login></Login>}></Route>
            <Route path="/addCategory" element={<AddCategories></AddCategories>}></Route>
            <Route path="/addCity" element={<AddCities></AddCities>}></Route>
            <Route path="/deleteApartment" element={<DeleteApartment></DeleteApartment>}></Route>
            <Route path="/addApartment" element={<AddApartments></AddApartments>}></Route>
            <Route path="/getByCity" element={<GetByCity></GetByCity>}></Route>
            <Route path="/updateApartment" element={<UpdateApartment></UpdateApartment>}></Route>
            <Route path="/connectAdvertiser" element={<ConnectAdvertiser></ConnectAdvertiser>}></Route>

        </Routes>
    </>
}