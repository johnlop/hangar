import { combineReducers } from 'redux';
import { squadsReducer } from './squads';

export const appReducer = combineReducers({
    squads: squadsReducer,
});
