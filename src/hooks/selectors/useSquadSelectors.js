import { useSelector } from 'react-redux';
import _ from 'lodash';

export function useSquadsSelectors() {
    const faction = useSelector((state) => state.faction);
    const squadsMap = useSelector((state) => state.squads || {});
    const selectedSquad = useSelector((state) => state.squads[state.selectedSquadId]);
    const ships = useSelector((state) =>
        state.squads[state.selectedSquadId] ? state.squads[state.selectedSquadId].ships : [],
    );
    const selectedShip = useSelector((state) =>
        state.squads[state.selectedSquadId] ? state.squads[state.selectedSquadId].ships[state.selectedShipId] : null,
    );

    const selectedShipId = useSelector((state) => state.selectedShipId);

    return {
        faction,
        squads: Object.values(squadsMap),
        selectedSquad,
        ships,
        selectedShipId,
        selectedShip,
        // selectedShip: _.cloneDeep(selectedShip),
    };
}
