import { useDispatch } from 'react-redux';
import { setSquad, setSquads } from '../../store/actions/squads';

export function useSquadActions() {
    const dispatch = useDispatch();

    const updateAllSquads = (squads) => {
        dispatch(setSquads(squads));
    };

    const updateSquad = (squad) => {
        dispatch(setSquad(squad));
    };

    return {
        updateAllSquads,
        updateSquad,
    };
}
