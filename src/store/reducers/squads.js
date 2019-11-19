import { SET_SQUADS, SET_SQUAD, SET_SELECTED_SQUAD, SET_SELECTED_SHIP, SET_SHIP, SET_FACTION } from '../actions/squads';

const defaultStore = {
    squads: {},
};

export function squadsReducer(squads = defaultStore, action) {
    console.log(action.type);
    if (action.type === SET_FACTION) {
        squads.faction = action.faction;
        return squads;
    }
    if (action.type === SET_SQUADS) {
        squads.squads = {};
        action.squads.forEach((squad) => {
            squads.squads[squad.id] = squad;
        });
        return squads;
    }
    if (action.type === SET_SELECTED_SQUAD) {
        squads.selectedSquadId = action.squadId;
        return squads;
    }
    if (action.type === SET_SQUAD) {
        squads.squads[squads.selectedSquadId] = action.squad;
        return squads;
    }
    if (action.type === SET_SELECTED_SHIP) {
        squads.selectedShipId = action.shipId;
        return squads;
    }
    if (action.type === SET_SHIP) {
        squads.squads[squads.selectedSquadId].ships[squads.selectedShipId] = action.squad;
        return squads;
    }
    return squads;
}
