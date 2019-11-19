import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from './middleware/logger';
import { appReducer } from './reducers';
import { generateNewSquad } from '../helpers/dbHelper';
import * as database from '../data/database';
import { squadsReducer } from './reducers/squads';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

database.load();
const f = { xws: 'rebelalliance', name: database.db.factions['rebelalliance'].name };
const s = generateNewSquad(f);

const initialState = {
    squads: {
        faction: f,
        map: {},
    },
};

initialState.squads.map[s.id] = s;
initialState.squads.selectedSquadId = s.id;
initialState.squads.selectedShipId = 0;

export const store = createStore(appReducer, initialState, composeEnhancers(applyMiddleware(logger)));
