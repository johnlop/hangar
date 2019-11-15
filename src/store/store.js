import { createStore, applyMiddleware, compose } from 'redux';
import { appReducer } from './reducers';
import { logger } from './middleware/logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(appReducer, composeEnhancers(applyMiddleware(logger)));
