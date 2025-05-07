import { createStore } from "redux";
import {produce} from 'immer'
const initialState = {
    currentAdvertiser:{}
}
const Reducer=produce((state,action)=>{
    switch (action.type) {
    case 'SET_CURRENT_ADVERTISER':
        state.currentAdvertiser = action.payload
        case 'REMOVE_APARTMENT':
            state.Apartment = state.Apartment.filter(Apartment => Apartment.nameApartment !== action.payload);
            break;
    }
}, initialState)
const myStore=createStore(Reducer)
// window.store =myStore
 export default myStore
