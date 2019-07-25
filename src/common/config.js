import { createStore, combineReducers, applyMiddleware } from 'redux';
import GetAllData from '../reducers/getAllData';

const rootReducer = combineReducers({
    data: GetAllData,
});

const store = createStore(
    rootReducer,
    //applyMiddleware('redux-thunk'),
);

export default store;