import axios from 'axios';
import { useMemo } from 'react';



export function useApi() {

    const httpClient = useMemo(() => axios.create({
        baseURL: 'http://192.168.1.23:3000/api'
    }), [])

    const login = async () => await httpClient.get('/whatever')
    const getHouseDetails = async houseId => (await httpClient.get(`/houses/${houseId}`)).data
    const deleteProduct = async (houseId, productId) => (await httpClient.put(`/houses/DeleteProduct/${houseId}/${productId}`))
    const updateQuantity = async (houseId, productId, Quantity) => (await httpClient.put(`/houses/updateQuantity/${houseId}/${productId}/${Quantity}`))
    const getSupermarkets = async (lat, long,radius) => (await httpClient.get('/maps/supermarkets', { params: { lat, long,radius } })).data
    const getMyHistory = async (userID)=>(await httpClient.get(`/OldList/${userID}`)).data
    const getUserFavorites = async userId => (await httpClient.get(`/favorite/${userId}`)).data;
    const addFav =async (userID,HistoryId)=>(await httpClient.post(`/favorite/addFav/${userID}/${HistoryId}`))
    const addProduct=async (listId,product_name,product_unit_name,manufacturer_id,product_barcode,product_description,quantity,manufacturer_name)=>
                                                 (await httpClient.put(`/houses/AddProduct/${listId}`,{items:{product_name: product_name,product_unit_name:product_unit_name,
                                                    manufacturer_id:manufacturer_id,product_barcode:product_barcode,product_description:product_description,quantity,manufacturer_name}}))
    
    const removeFav =async (userID,HistoryId)=>(await httpClient.delete(`/favorite/delete/${userID}/${HistoryId}`))
    return { login, getHouseDetails, deleteProduct, updateQuantity, getSupermarkets,getMyHistory,getUserFavorites,addFav,removeFav,addProduct};

}