/*
    This file exists so you can import it:

    import Pexels from '~/src/containers/Pexels'

    and have access to the "Pexels container" as well as the store importing the reducer and the epics together.
    See ~/src/redux/store-new.js
*/
import * as PexelsEpics from './epics';
import * as pexelsActions from './actions';
import * as pexelsActiontypes from './actionTypes';
import { pexelsReducer } from './reducer';

/* This just imports and spreads the epics methods so you don't have to manually import every epic you create in the */
const pexelsEpics = Object.values({ ...PexelsEpics });

export {
	pexelsActions,
	pexelsActiontypes,
	pexelsEpics,
	pexelsReducer
};
