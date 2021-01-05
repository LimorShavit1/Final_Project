export const FIND_ITEM_SUCCESS = 'FIND_ITEM_SUCCESS';
export const FIND_ITEM_FAIL = 'FIND_ITEM_FAIL';


const BASE_URL = 'http://192.168.56.1:3000';

export const registerUser = (itemData) => {

    const { itemName } = itemData;

    return async dispatch => {

        //logic to make post request to fetch wanted item
        const result = await fetch(`${BASE_URL}/api/list/findItemByName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemName
            })
        })

        const resultData = await result.json();
        console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: FIND_ITEM_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: FIND_ITEM_FAIL
            });
        }
        return resultData;
    }
}