import {FETCH_HOUSES, CREATE_HOUSES,DELETE_LIST,DELETE_ITEM} from '../actions/houseAction';

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
          case DELETE_LIST:
            const {idToDelete} = action.payload;
          return {
              ...state,
              houses: state.houses.filter(h => h._id !== idToDelete)
          }  
          case DELETE_ITEM:
            const {ListID,ProductID} = action.payload;
            const newHouses = [...state.houses];
            let listIndex = newHouses.findIndex(element => element._id == ListID);
            newHouses[listIndex]={...newHouses[listIndex],items: newHouses[listIndex].items.filter(element =>element._id !== ProductID)};
         
           
           
          return {
              ...state,
             
              houses: newHouses
            
          }  

    }

    return state;
}