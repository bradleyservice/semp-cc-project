/* Your actions use the actionType constants that the epics & reducers are listening to. */

import {
    GET_PHOTOS,
    GET_PHOTOS_COMPLETED,
    GET_PHOTOS_FAILED,
} from './actionTypes';

export const getPhotos = () => {
    return {
        type: GET_PHOTOS
    }
}

// NOTE: The reason we don't **have** to define the response and error here, is because in the reducer
//       We expect the _FAILED action.payload to be an error & and the _COMPLETED action.payload to be
//       a successful data return.

export const getPhotosCompleted = (payload) => {
    return {
        type: GET_PHOTOS_COMPLETED,
        payload
    }
}

export const getPhotosFailed = (payload) => {
    return {
        type: GET_PHOTOS_FAILED,
        payload
    }
}