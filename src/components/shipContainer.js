import React from 'react';
import ShipPicker from './shipPicker';
import PilotPicker from './pilotPicker';

const ShipContainer = ({ ship, updateShip }) => {
    return (
        <div className="container">
            <ShipPicker ship={ship} updateShip={updateShip} />
            <PilotPicker ship={ship} updateShip={updateShip} />
        </div>
    );
};

export default ShipContainer;
