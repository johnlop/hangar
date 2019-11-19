import { useSelector } from 'react-redux';

export function useSquadsSelectors() {
    const faction = useSelector((state) => state.squads.faction);
    const squadMap = useSelector((state) => state.squads.map || {});
    const selectedSquad = useSelector((state) => state.squads.map[state.squads.selectedSquadId]);
    const ships = useSelector((state) =>
        state.squads.map[state.squads.selectedSquadId] ? state.squads.map[state.squads.selectedSquadId].ships : [],
    );
    const selectedShip = useSelector((state) =>
        state.squads.map[state.squads.selectedSquadId]
            ? state.squads.map[state.squads.selectedSquadId].ships[state.squads.selectedShipId]
            : null,
    );

    const selectedShipId = useSelector((state) => state.squads.selectedShipId);

    return { faction, squads: Object.values(squadMap), selectedSquad, ships, selectedShipId, selectedShip };
}
