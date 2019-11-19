import { useSelector } from 'react-redux';

export function useSquadsSelectors() {
    const faction = useSelector((state) => state.faction);
    const squadMap = useSelector((state) => state.map || {});
    const selectedSquad = useSelector((state) => state.map[state.selectedSquadId]);
    const ships = useSelector((state) =>
        state.map[state.selectedSquadId] ? state.map[state.selectedSquadId].ships : [],
    );
    const selectedShip = useSelector((state) =>
        state.map[state.selectedSquadId] ? state.map[state.selectedSquadId].ships[state.selectedShipId] : null,
    );

    const selectedShipId = useSelector((state) => state.selectedShipId);

    return { faction, squads: Object.values(squadMap), selectedSquad, ships, selectedShipId, selectedShip };
}
