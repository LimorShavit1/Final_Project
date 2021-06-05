export const FIND_PRODUCT_SUCCESS = 'FIND_ITEM_SUCCESS';
export const FIND_PRODUCT_FAIL = 'FIND_ITEM_FAIL';

export const GET_USER_REQUESTS_SUCCESS = 'GET_USER_REQUESTS_SUCCESS';
export const GET_USER_REQUESTS_FAIL = 'GET_USER_REQUESTS_FAIL';

export const SEND_USER_REQUEST_SUCCESS = 'SEND_USER_REQUEST_SUCCESS';
export const SEND_USER_REQUEST_FAIL = 'SEND_USER_REQUEST_FAIL';

export const USER_CENCEL_REQUEST_SUCCESS = 'USER_CENCEL_REQUEST_SUCCESS';
export const USER_CENCEL_REQUEST_FAIL = 'USER_CENCEL_REQUEST_FAIL';

export const USER_ACCEPT_REQUEST_SUCCESS = 'USER_ACCEPT_REQUEST_SUCCESS';
export const USER_ACCEPT_REQUEST_FAIL = 'USER_ACCEPT_REQUEST_FAIL';


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
        //console.log('Line 27');

        console.log(resultData);

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

//pull all user's requests
export const getMyRequests = (itemData) => {

    const { _id } = itemData;
    //console.log("IN listAction.getMyRequests() line 50, userID: " + _id);

    return async dispatch => {

        //logic to make post request to fetch wanted product
        const result = await fetch(`${BASE_URL}/api/list/pullAllRequests/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })


        const resultData = await result.json();
        //console.log("resultData:  " + resultData.requests[0]);

        if (resultData.success) {
            dispatch({
                type: GET_USER_REQUESTS_SUCCESS,
                payload: resultData.requests[0].Requests

            });
        } else {
            dispatch({
                type: GET_USER_REQUESTS_FAIL
            });
        }

        return resultData;
    }


}

//send user request & try to add user to list
export const sendMyRequest = (itemData) => {

    const { email, Requests } = itemData;
 
    return async dispatch => {

        //logic to make post request to add user to list
        const result = await fetch(`${BASE_URL}/api/list/addUserToList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //pass data to server
                email,
                Requests,
            })
        })

        const resultData = await result.json();
        //console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: SEND_USER_REQUEST_SUCCESS,
                payload: resultData

            });
        } else {
            dispatch({
                type: SEND_USER_REQUEST_FAIL
            });
        }

        return resultData;
    }

}

export const UserRefuseJoinToList = (itemData) => {

    const { custumerId, requestId } = itemData;

    return async dispatch => {

        //logic to make post request to add user to list
        const result = await fetch(`${BASE_URL}/api/list/UserRefuseJoinToList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //pass data to server
                custumerId,
                requestId,
            })
        })

        const resultData = await result.json();
        //console.log(resultData);

        if (resultData.success) {

            dispatch({
                type: USER_CENCEL_REQUEST_SUCCESS,
                payload: resultData

            });
        } else {
            dispatch({
                type: USER_CENCEL_REQUEST_FAIL
            });
        }

        return resultData;
    }

}

export const UserAcceptJoinToList = (itemData) => {

    const { listId, custumerId, requestId } = itemData;

    return async dispatch => {

        //logic to make post request to add user to list
        const result = await fetch(`${BASE_URL}/api/list/UserAcceptJoinToList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //pass data to server
                listId,
                custumerId,
                requestId,
            })
        })

        const resultData = await result.json();
        //console.log(resultData);

        if (resultData.success) {

            dispatch({
                type: USER_ACCEPT_REQUEST_SUCCESS,
                payload: resultData

            });
        } else {
            dispatch({
                type: USER_ACCEPT_REQUEST_FAIL
            });
        }

        return resultData;
    }

}