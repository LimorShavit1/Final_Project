import {
    FIND_PRODUCT_SUCCESS,
    FIND_PRODUCT_FAIL,
    GET_USER_REQUESTS_SUCCESS,
    GET_USER_REQUESTS_FAIL,
    SEND_USER_REQUEST_SUCCESS,
    SEND_USER_REQUEST_FAIL,
    USER_CENCEL_REQUEST_SUCCESS,
    USER_CENCEL_REQUEST_FAIL,
    USER_ACCEPT_REQUEST_SUCCESS,
    USER_ACCEPT_REQUEST_FAIL

} from '../actions/listAction';

const initialState = {
    products: [],
    requests: [],
    msg: {},
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FIND_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case FIND_PRODUCT_FAIL:
            return {
                ...state,
                errors: true
            }
        case GET_USER_REQUESTS_SUCCESS:
            //console.log("& " + requests);
            return {
                ...state,
                //requests: [...state.requests,action.payload]
                requests: action.payload
            }
        case GET_USER_REQUESTS_FAIL:
            return {
                ...state,
                errors: true
            }
        case SEND_USER_REQUEST_SUCCESS:
            return {
                ...state,
                // requests: action.payload
            }
        case SEND_USER_REQUEST_FAIL:
            return {
                ...state,
                errors: true
            }
        case USER_CENCEL_REQUEST_SUCCESS:
            return {
                ...state,
                requests: action.payload.data
            }

        case USER_CENCEL_REQUEST_FAIL:
            return {
                ...state,
                errors: true
            }

        case USER_ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                requests: action.payload.data
            }

        case USER_ACCEPT_REQUEST_FAIL:
            return {
                ...state,
                errors: true
            }


    }

    return state;

}