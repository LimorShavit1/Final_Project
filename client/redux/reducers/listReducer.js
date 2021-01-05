import { FIND_ITEM_SUCCESS, FIND_ITEM_FAIL } from '../actions/listAction';

const initialState = {
    item: {},
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FIND_ITEM_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case FIND_ITEM_FAIL:
            return {
                ...state,
                errors: true
            }

    }
    return state;

}