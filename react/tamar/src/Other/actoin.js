export const setCurrentAdvertiser=(user)=>{
    debugger
    return { type:'SET_CURRENT_ADVERTISER',payload:user }
}
export const removeApartment=(nameApartment)=>{
    return {type:'REMOVE_APARTMENT',payload:nameApartment}
}
