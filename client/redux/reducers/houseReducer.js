import {FETCH_HOUSES, CREATE_HOUSES} from '../actions/houseAction';

const intialState = {
    houses: []
}

export default function(state = intialState, action) {

    switch(action.type) {
        case FETCH_HOUSES:
            return {
                ...state,
                houses: action.payload
            }
        case CREATE_HOUSES:
            console.log(action.payload)
          return {
              ...state,
              houses: state.houses.concat(action.payload.data)
          }  
    }

    return state;
}