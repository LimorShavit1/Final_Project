export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const USER_SET_PASSWORD_SUCCESS = 'USER_SET_PASSWORD_SUCCESS';
export const USER_SET_PASSWORD_FAIL = 'USER_SET_PASSWORD_FAIL';
import jwtDecode from 'jwt-decode';

const BASE_URL = 'http://192.168.56.1:3000';
//const BASE_URL = 'https://final2704.herokuapp.com';

export const registerUser = (authData) => {

    const { fullName, email, password } = authData;

    return async dispatch => {

        //logic to make post request to create the user
        const result = await fetch(`${BASE_URL}/api/users/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        })

        const resultData = await result.json();
        //console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: jwtDecode(resultData.token)
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL
            });
        }
        return resultData;
    }
}

export const loginUser = (authData) => {
    const { email, password } = authData;

    return async dispatch => {

        //logic to make post request to create the user
        const result = await fetch(`${BASE_URL}/api/users/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        //result data contain the object : {message,success}
        const resultData = await result.json();
        console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: jwtDecode(resultData.token)
            });
        } else {
            dispatch({
                type: LOGIN_USER_FAIL,
            });
        }

        return resultData;

    }
}

export function setUserPassword(authData) {
    const { email, password } = authData;
    return async (dispatch) => {

        //logic to make post set user password
        const result = await fetch(`${BASE_URL}/api/users/ForgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        //result data contain the object : {message,success}
        const resultData = await result.json();
        console.log(resultData);

        if (resultData.success) {
            dispatch({
                type: USER_SET_PASSWORD_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: USER_SET_PASSWORD_FAIL,
            });
        }

        return resultData;

    };

}