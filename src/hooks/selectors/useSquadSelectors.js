import { useSelector } from 'react-redux';

export function useSquadsSelectors() {
    const faction = useSelector((state) => state.squads.faction);
    const squadMap = useSelector((state) => state.squads.map || {});
    const selectedSquad = useSelector((state) => state.squads.map[state.squads.selectedSquad]);
    const ships = useSelector((state) =>
        state.squads.map[state.squads.selectedSquad] ? state.squads.map[state.squads.selectedSquad].ships : [],
    );
    const selectedShip = useSelector((state) =>
        state.squads.map[state.squads.selectedSquad]
            ? state.squads.map[state.squads.selectedSquad].ships[state.squads.selectedShip]
            : null,
    );

    const selectedShipId = useSelector((state) => state.squads.selectedShip);

    return { faction, squads: Object.values(squadMap), selectedSquad, ships, selectedShipId, selectedShip };
}
