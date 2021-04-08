export const FETCH_HOUSES = 'FETCH_HOUSES';
export const CREATE_HOUSES = 'CREATE_HOUSES';

const BASE_URL = 'http://192.168.56.1:3000';

export const fetchHouses = () => {
    return async dispatch => {

        // logic to fetch houses from API
        const result = await fetch(`${BASE_URL}/api/houses`);

        const resultData = await result.json();

        dispatch({
            type: FETCH_HOUSES,
            payload: resultData
        });
    }
}

export const createHome = ({CustumerID,ListName,items}) => {

    return async dispatch => {
        const response = await fetch(`${BASE_URL}/api/houses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CustumerID,
                ListName,
                items
            })
        })

        const responseData = await response.json();

        dispatch({
            type: CREATE_HOUSES,
            payload: responseData
        })
    }

}