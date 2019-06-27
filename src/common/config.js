import { createStore, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
});

const store = createStore(
    rootReducer,
    // applyMiddleware('redux-thunk'),
);

export default store;