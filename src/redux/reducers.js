const initialState = {
    ships: [],
};

export default function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_SHIP') {
        return Object.assign({}, state, {
            ships: state.ships.concat(action.payload),
        });
    }
    return state;
}
