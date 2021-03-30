import { fromJS } from 'immutable';
import {
	GET_PHOTOS,
	GET_PHOTOS_COMPLETED,
	GET_PHOTOS_FAILED
} from './actionTypes';


/* You want to use fromJS to protect against state mutation. */
export const initialState = fromJS({
	photos: [],
	isLoading: false,
	hasBeenLoaded: false,
	error: null
});

export const pexelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PHOTOS:
			return state.set('isLoading', true);

		case GET_PHOTOS_COMPLETED:
            return state
                .set('isLoading', false)
                .set('hasBeenLoaded', true)
                .set('photos', action.payload.photos)
                .set('error', null);

		case GET_PHOTOS_FAILED:
			return state
                .set('isLoading', false)
                .set('hasBeenLoaded', true)
                .set('photos', [])
                .set('error', action.payload);

		default:
			return state;
	}
};
