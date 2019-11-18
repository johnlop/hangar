import { SET_SQUADS, SET_SQUAD, SET_SELECTED_SQUAD, SET_SELECTED_SHIP, SET_SHIP, SET_FACTION } from '../actions/squads';

const defaultStore = {
    map: {},
};

export function squadsReducer(squads = defaultStore, action) {
    console.log(action.type);
    if (action.type === SET_FACTION) {
        squads.faction = action.faction;
        return squads;
    }
    if (action.type === SET_SQUADS) {
        squads.map = {};
        action.squads.forEach((squad) => {
            squads.map[squad.id] = squad;
        });
        return squads;
    }
    if (action.type === SET_SELECTED_SQUAD) {
        squads.selectedSquad = action.squadId;
        return squads;
    }
    if (action.type === SET_SQUAD) {
        squads.map[squads.selectedSquad] = action.squad;
        return squads;
    }
    if (action.type === SET_SELECTED_SHIP) {
        squads.selectedShip = action.shipId;
        return squads;
    }
    if (action.type === SET_SHIP) {
        squads.map[squads.selectedSquad].ships[squads.selectedShip] = action.squad;
        return squads;
    }
    return squads;
}
