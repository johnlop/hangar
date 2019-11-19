import { SET_SQUADS, SET_SQUAD, SET_SELECTED_SQUAD, SET_SELECTED_SHIP, SET_SHIP, SET_FACTION } from '../actions/squads';

const defaultStore = {
    squads: {},
};

export function squadsReducer(state = defaultStore, action) {
    console.log(action.type);
    if (action.type === SET_FACTION) {
        state.faction = action.faction;
        return state;
    }
    if (action.type === SET_SQUADS) {
        state.squads = {};
        action.squads.forEach((squad) => {
            state.squads[squad.id] = squad;
        });
        return state;
    }
    if (action.type === SET_SELECTED_SQUAD) {
        state.selectedSquadId = action.squadId;
        return state;
    }
    if (action.type === SET_SQUAD) {
        state.squads[state.selectedSquadId] = action.squad;
        return state;
    }
    if (action.type === SET_SELECTED_SHIP) {
        state.selectedShipId = action.shipId;
        return state;
    }
    if (action.type === SET_SHIP) {
        state.squads[state.selectedSquadId].ships[state.selectedShipId] = action.ship;
        return state;
    }
    return state;
}
