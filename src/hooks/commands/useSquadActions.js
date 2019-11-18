import { useDispatch } from 'react-redux';
import { setSquad, setSquads, setSelectedSquad, setSelectedShip, setShip } from '../../store/actions/squads';

export function useSquadActions() {
    const dispatch = useDispatch();

    const updateAllSquads = (squads) => {
        dispatch(setSquads(squads));
    };

    const updateSelectedSquad = (id) => {
        dispatch(setSelectedSquad(id));
    };

    const updateSquad = (squad) => {
        dispatch(setSquad(squad));
    };

    const updateSelectedShip = (id) => {
        dispatch(setSelectedShip(id));
    };

    const updateShip = (ship) => {
        dispatch(setShip(ship));
    };

    return {
        updateAllSquads,
        updateSelectedSquad,
        updateSquad,
        updateSelectedShip,
        updateShip,
    };
}
