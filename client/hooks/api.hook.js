import axios from 'axios';
import { useMemo } from 'react';


const BASE_URL = 'http://192.168.56.1:3000/api';
//const BASE_URL = 'https://final2704.herokuapp.com/api';

export function useApi() {

    const httpClient = useMemo(() => axios.create({
        baseURL: BASE_URL
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
    const SuperGetMap=async (lat, long,radius)=>(await httpClient.get('/maps/supergetmarkets',{params:{ lat,long,radius}})).data
    const getPrice=async (store_id, product_barcode)=>(await httpClient.get('/maps/getPrice/supergetmarkets',{params:{store_id, product_barcode}})).data
    const removeFav =async (userID,HistoryId)=>(await httpClient.delete(`/favorite/delete/${userID}/${HistoryId}`))
    const changeImage=async (oldListId,image)=>{
        const formData = new FormData();
        const fileExtension = image.uri.split('.').pop().replace('jpg','jpeg');
        const imageName = image.uri.split('/').pop();
        const imageData = {name: imageName, type: `image/${fileExtension}`, uri: image.uri};
        console.log(imageData);
        formData.append('image', imageData);
        await httpClient.post(`/OldList/setImage/${oldListId}`,formData, {headers: {'Content-type' :'multipart/form-data'}})
    }
    const addtoHistory=async (itemToHistory,price)=>(await httpClient.post(`/OldList/${price}`,{CustumerID: itemToHistory.CustumerID,ListName: itemToHistory.ListName,items:itemToHistory.items,
        uri:itemToHistory.uri,}))
    const   getList=async (listid)=>(await httpClient.get(`/houses/${listid}`));
    return { login, getHouseDetails, deleteProduct, updateQuantity, getSupermarkets,getMyHistory,getUserFavorites,addFav,removeFav,addProduct,SuperGetMap,changeImage, addtoHistory,getPrice,getList};

}