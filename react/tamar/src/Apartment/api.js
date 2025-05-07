import axios from "axios";

const baseUrl = `http://localhost:3001`;

export const getAllApartment = async() => {
    return await axios.get(`${baseUrl}/Apartment`);
}

export const getByCityId = (id) => {
    return axios.get(`${baseUrl}/Apartment/getByCityId/${id}`);
}
export const getByCategoryId = (id) => {
    return axios.get(`${baseUrl}/Apartment/byCategory/${id}`);
}

export const getByIdApartment = (id) => {
    return axios.get(`${baseUrl}/Apartment/${id}`);
}

export const register = (newAdvertiser) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axios.post(`${baseUrl}/Advertiser/register`, newAdvertiser, { headers });
}
export const login = (newAdvertiser) => {
    return axios.post(`${baseUrl}/Advertiser/login`, newAdvertiser);
}
export const searchById = (id) => {
    return axios.post(`${baseUrl}/Apartment/${id}`);
}
export const getByCategory= (id) => {
    return axios.get(`${baseUrl}/Apartment/byCategory`);
}

export const AddCategory = (newCategory) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axios.post(`${baseUrl}/Category`, newCategory, { headers });
}

export const addCity = (newCity) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axios.post(`${baseUrl}/City`, newCity, { headers });
}
export const getAllCity= () => {
    return axios.get(`${baseUrl}/City`);
}
export const getAllCategory= () => {
    return axios.get(`${baseUrl}/category`);
}
export const addApartment = (newApartment) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return axios.post(`${baseUrl}/Apartment`, newApartment, { headers });
}


export const remove=async(id)=>{
    debugger
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    let a=await axios.delete(`${baseUrl}/Apartment/${id}`, { headers })
    return a

}
export const update=async(id,body)=>{
    debugger
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
     let a=await axios.patch(`${baseUrl}/Apartment/${id}`,body, { headers })
     return a
}
