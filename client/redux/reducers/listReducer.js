import { FIND_PRODUCT_SUCCESS, FIND_PRODUCT_FAIL } from '../actions/listAction';

const initialState = {
    products: [],
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

    }
    return state;

}