import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, FETCH_FAVORITES} from '../actions/favoritesAction';

const initial_state = {
    favoriteItemIds: [],
    isIntialized: false
}

export default function favoritesReducer(state = initial_state, action){

    const {type, payload} = action;
    switch(type){
        case FETCH_FAVORITES: {
            const {favoritesList} = payload;
            return {isIntialized: true, favoriteItemIds: favoritesList};
        }
        case ADD_TO_FAVORITES: {
            const {itemId} = payload;
            return {...state, favoriteItemIds: [...state.favoriteItemIds, itemId]}
        }
        case REMOVE_FROM_FAVORITES:{
            const {itemId} = payload;
            return {...state, favoriteItemIds: state.favoriteItemIds.filter(item => item !== itemId)}
        }
    }
    return state;

}