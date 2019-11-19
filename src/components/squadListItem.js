import React from 'react';

const SquadListItem = ({ squad, handleClick, className }) => {
    return (
        <div className={'row ' + className} onClick={handleClick}>
            <div className="squad-icon cell">
                <img src={`${process.env.PUBLIC_URL}/img/${squad.faction.xws}.png`} alt={squad.faction.name} />
            </div>
            <div className="cell">
                <div className="title">
                    {squad.name} - {squad.cost}pts
                </div>
                <div className="fluff">{squad.type}</div>
            </div>
        </div>
    );
};

export default SquadListItem;
