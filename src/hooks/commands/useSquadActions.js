import { useDispatch } from 'react-redux';
import {
    setFaction,
    setSquad,
    setSquads,
    setSelectedSquad,
    setSelectedShip,
    setShip,
} from '../../store/actions/squads';

export function useSquadActions() {
    const dispatch = useDispatch();

    const updateFaction = (faction) => {
        dispatch(setFaction(faction));
    };

    const updateAllSquads = (squads) => {
        dispatch(setSquads(squads));
    };

    const updateSelectedSquad = (id) => {
        dispatch(setSelectedSquad(id));
    };

    const updateSquad = (squad) => {
        squad.cost = 0;
        for (let s in squad.ships) {
            squad.cost += squad.ships[s].cost;
        }
        dispatch(setSquad(squad));
    };

    const updateSelectedShip = (id) => {
        dispatch(setSelectedShip(id));
    };

    const updateShip = (ship) => {
        ship.updt = new Date();
        dispatch(setShip(ship));
    };

    return {
        updateFaction,
        updateAllSquads,
        updateSelectedSquad,
        updateSquad,
        updateSelectedShip,
        updateShip,
    };
}
