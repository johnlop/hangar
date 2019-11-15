import { useSelector } from 'react-redux';

export function useSquadsSelectors(id) {
    const squads = useSelector((state) => state.squads.collection || []);
    const squad = useSelector((state) => state.squads.map[id] || {});

    return { squads, squad };
}
