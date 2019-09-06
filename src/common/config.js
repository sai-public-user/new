import { createStore, combineReducers, applyMiddleware } from 'redux';
import GetAllData from '../reducers/getAllData';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    data: GetAllData,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default store;