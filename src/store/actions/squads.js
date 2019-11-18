export const SET_FACTION = 'SET_FACTION';
export const SET_SQUADS = 'SET_SQUADS';
export const SET_SELECTED_SQUAD = 'SET_SELECTED_SQUAD';
export const SET_SQUAD = 'SET_SQUAD';
export const SET_SELECTED_SHIP = 'SET_SELECTED_SHIP';
export const SET_SHIP = 'SET_SHIP';

export function setFaction(faction = {}) {
    return {
        type: SET_FACTION,
        squads: faction,
        meta: {
            log: 'Set current faction',
        },
    };
}

export function setSquads(squads = []) {
    return {
        type: SET_SQUADS,
        squads,
        meta: {
            log: 'Replace squads with new squads',
        },
    };
}

export function setSelectedSquad(squadId = 0) {
    return {
        type: SET_SELECTED_SQUAD,
        squadId,
        meta: {
            log: 'Set selected squad',
        },
    };
}

export function setSquad(squad = {}) {
    return {
        type: SET_SQUAD,
        squad,
        meta: {
            log: 'Update selected squad',
        },
    };
}

export function setSelectedShip(shipId = 0) {
    return {
        type: SET_SELECTED_SHIP,
        shipId,
        meta: {
            log: 'Set selected ship',
        },
    };
}

export function setShip(ship = {}) {
    return {
        type: SET_SHIP,
        ship,
        meta: {
            log: 'Update selected ship',
        },
    };
}
