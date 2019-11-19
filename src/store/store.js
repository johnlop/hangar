import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from './middleware/logger';
import { generateNewSquad } from '../helpers/dbHelper';
import * as database from '../data/database';
import { squadsReducer } from './reducers/squads';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

database.load();
const f = { xws: 'rebelalliance', name: database.db.factions['rebelalliance'].name };
const s = generateNewSquad(f);

const initialState = {
    faction: f,
    map: {},
};

initialState.map[s.id] = s;
initialState.selectedSquadId = s.id;
initialState.selectedShipId = 0;

export const store = createStore(squadsReducer, initialState, composeEnhancers(applyMiddleware(logger)));
