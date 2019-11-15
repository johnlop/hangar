import React, { useState } from 'react';

const ShipListItem = ({ initialShip, onItemClick, copyShip, deleteShip, className }) => {
    const [ship, setShip] = useState(initialShip);

    const handleClick = () => {
        onItemClick(ship);
    };

    const handleCopy = () => {
        copyShip(ship);
    };

    const handleDelete = () => {
        deleteShip(ship);
    };

    const getInstalledUpgrades = () => {
        let arr = [];

        for (let u of ship.upgrades) {
            let upg = u.name;
            if (!upg.startsWith('No')) {
                arr.push(upg);
            }
        }

        return <span>{arr.join(', ')}</span>;
    };

    let font = 'xwing-miniatures-ship xwing-miniatures-ship-' + ship.model.xws;
    let upg = getInstalledUpgrades();

    return (
        <div className={'row ' + className}>
            <div className="ship-icon cell" onClick={handleClick}>
                <i className={font} />
            </div>
            <div className="cell" onClick={handleClick}>
                <div className="title">
                    {ship.pilot.name} ({ship.model.name}) - {ship.cost}pts
                </div>
                <div className="fluff">{upg}</div>
            </div>
            <div className="cell">
                <button onClick={handleCopy}>Copy</button>
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    );
};

export default ShipListItem;
