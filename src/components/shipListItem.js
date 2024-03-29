import React, { Component } from 'react';

export default class ShipListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.handleClick = this.handleClick.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick() {
        this.props.onItemClick(this.props.ship);
    }

    handleCopy() {
        this.props.copyShip(this.props.ship);
    }

    handleDelete() {
        this.props.deleteShip(this.props.ship);
    }

    getInstalledUpgrades() {
        let arr = [];

        for (let u of this.state.ship.upgrades) {
            let upg = u.name;
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
            <div className={'row ' + this.props.className}>
                <div className="ship-icon cell" onClick={this.handleClick}>
                    <i className={font} />
                </div>
                <div className="cell" onClick={this.handleClick}>
                    <div className="title">
                        {this.state.ship.pilot.name} ({this.state.ship.model.name}) - {this.state.ship.cost}pts
                    </div>
                    <div className="fluff">{upg}</div>
                </div>
                <div className="cell">
                    <button onClick={this.handleCopy}>Copy</button>
                    <button onClick={this.handleDelete}>X</button>
                </div>
            </div>
        );
    }
}
