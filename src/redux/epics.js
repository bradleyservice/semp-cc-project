// DEPRECATED

// import { from, of } from 'rxjs';
// import { loadedData } from './reducer';
// import {Observable} from 'rxjs';
// import axios from 'axios';

// export const observable$ = Observable.create((observer) => {
//     axios.get('https://api.pexels.com/v1/curated', {
//         header: {
//             'Authorization': `${process.env.REACT_APP_API_KEY}`
//         }
//     }.then(res => {
//         observer.next(res.data.photos)
//         observer.complete();
//     })
//     .catch(err => {
//         observer.error(err);
//     }))
// });

// let subscription = observable$.subscribe({
//     next: data => console.log('[data] => ', data),
//     complete: data => console.log('[complete')
// })

// const loadDataEpic = (actions$, state$) => actions$.pipe(
//     ofType('/api/loadData'),
//     mergeMap(action => from(axios.get('https://api.pexels.com/v1/curated', {
//         headers: {
//             'Authorization': `${process.env.REACT_APP_API_KEY}`
//         }
//     }).pipe(
//         map(res => loadedData(res.data.photos),
//         catchError(err => of(loadedDataFailed(err)),
//         startWith(loadingData())
//         ))
//     ))
// )

