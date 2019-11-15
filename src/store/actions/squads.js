export const SET_SQUADS = 'SET_SQUADS';
export const SET_SQUAD = 'SET_SQUAD';

export function setSquads(squads = []) {
    return {
        type: SET_SQUADS,
        squads,
        meta: {
            log: 'Replace squads with new squads',
        },
    };
}

export function setSquad(squad = {}) {
    return {
        type: SET_SQUAD,
        squad,
        meta: {
            log: 'Replace squad with new squad',
        },
    };
}
