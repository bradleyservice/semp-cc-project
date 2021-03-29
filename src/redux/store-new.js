import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {  } from 'redux';
import { catchError } from 'rxjs/operators';
import {
	pexelsEpics,
	pexelsReducer
} from '../containers/Pexels';

const epicMiddleware = (store) => {
	const originalEpicMiddleware = createEpicMiddleware({
		dependencies: {
			dispatch: store.dispatch
		}
	});

	const storeMiddleware = originalEpicMiddleware(store);

	epicMiddleware.run = originalEpicMiddleware.run;

	return storeMiddleware;
};

const epics = combineEpics(
	...pexelsEpics,
	// ...OtherEpics,
	// ...OtherEpics,
	// ...OtherEpics
);

const rootReducer = combineReducers({
	pexelsReducer
	// OtherReducer
	// OtherReducer,
	// OtherReducer
});

const rootEpic = (action$, store$, dependencies) =>
	epics(action$, store$, dependencies).pipe(
		catchError((error, source) => {
			console.error('Root Epic Error Catcher', error);
			return source;
		})
	);

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
