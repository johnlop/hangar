import { SET_SQUADS, SET_SQUAD } from '../actions/squads';

const defaultStore = {
    map: {},
};

export function squadsReducer(squads = defaultStore, action) {
    if (action.type === SET_SQUADS) {
        squads.collection = action.squads;
        squads.map = {};
        action.squads.forEach((squad) => {
            squads.map[squad.id] = squad;
        });
        return squads;
    }
    if (action.type === SET_SQUAD) {
        squads.map[action.squad.id] = action.squad;
        return squads;
    }
    return squads;
}
