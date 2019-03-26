import React, { Component } from 'react';

export default class ShipListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onItemClick(this.props.ship);
    }

    getInstalledUpgrades() {
        let arr = [];

        for (let s of this.state.ship.pilot.slots) {
            let upg = this.state.ship.upgrades[s.toLowerCase().replace(/ /g, '')].name;
            if (!upg.startsWith('No')) {
                arr.push(upg);
            }
        }

        return <span>{arr.join(', ')}</span>;
    }

    render() {
        let font = 'xwing-miniatures-ship xwing-miniatures-ship-' + this.state.ship.model.xws;
        let upg = this.getInstalledUpgrades();

        return (
            <div className={'row ' + this.props.className} onClick={this.handleClick}>
                <div className="ship-icon cell">
                    <i className={font} />
                </div>
                <div className="cell">
                    <div className="title">
                        {this.state.ship.pilot.name} ({this.state.ship.model.name}) - {this.state.ship.totalCost}pts
                    </div>
                    <div className="fluff">{upg}</div>
                </div>
            </div>
        );
    }
}
