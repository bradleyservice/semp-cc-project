const initialState = {
    photos: []
};

const GET_PHOTOS = "GET_PHOTOS";

export function loadData(requestBody) {
    return {
        type: 'api/loadData',
        payload: {
            requestBody
        }
    }
}

export function loadingData() {
    return {
        type: 'api/loadingData'
    }
}

export function loadedData(response) {
    return {
        type: 'api/loadedData',
        payload: {
            response
        }
    }
}

export function loadDataFailed(error) {
    return {
        type: 'api/loadDataFailed',
        payload: {
            error
        }
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_PHOTOS + "_PENDING":
            return state
        case GET_PHOTOS + "_FULFILLED":
            return {...state, photos: action.payload}
        case GET_PHOTOS + "_REJECTED":
            return initialState
        default:
            return state
    }
}