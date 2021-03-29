import axios from 'axios';
import { ofType } from 'redux-observable';
import { of, merge } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';

import { getPhotosCompleted, getPhotosFailed } from './actions.js';
import { GET_PHOTOS } from './actionTypes.js';

export const getPhotosEpic = (action$) =>
	action$.pipe(
		ofType(GET_PHOTOS),
		mergeMap(async (action) => {

            // You would set this at the application load depending on what all API's your accessing.
            axios.defaults.headers.common.Authorization = process.env.REACT_APP_API_KEY;

			const pexelsResponse = await axios.get(`https://api.pexels.com/v1/curated`);
            
            // If you want to do any special header/status handling here.

			return pexelsResponse.data;
		}),
		switchMap((res) => [
			getPhotosCompleted(res)
            // Any other actions on successful data retrieval such as toast messages or redirects.
		]),
		catchError((error, source) =>
			merge(
				of(
                    getPhotosFailed(error)
                    // Any other actions on fail, such as toast messages or logs
                ),
				source
			)
		)
	);