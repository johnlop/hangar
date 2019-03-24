import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { ships: state.ships };
};

const ConnectedShipList = ({ ships }) => (
    <div>
        {ships.map((el) => (
            <div className="cell" key={el.id}>
                {el.title}
            </div>
        ))}
    </div>
);

const ShipList = connect(mapStateToProps)(ConnectedShipList);

export default ShipList;
