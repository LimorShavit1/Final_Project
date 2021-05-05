export const FIND_PRODUCT_SUCCESS = 'FIND_ITEM_SUCCESS';
export const FIND_PRODUCT_FAIL = 'FIND_ITEM_FAIL';


const BASE_URL = 'http://192.168.56.1:3000';
//const BASE_URL = 'https://final2704.herokuapp.com';

export const findProductByName = (itemData) => {

    const { productName } = itemData;
   // console.log(productName);

    return async dispatch => {

        //logic to make post request to fetch wanted product
        const result = await fetch(`${BASE_URL}/api/list/findItemByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //pass product name to server
                productName,
            })
        })

        const resultData = await result.json();
        console.log('Line 27');
    
        //console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: FIND_PRODUCT_SUCCESS,
                payload: resultData
                
            });
        } else {
            dispatch({
                type: FIND_PRODUCT_FAIL
            });
        }
       
        return resultData;
    }
}