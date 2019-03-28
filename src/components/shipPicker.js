import React, { Component } from 'react';
import * as database from '../data/database';
import Ship from './ship';

export default class ShipPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.changeModelId = this.changeModelId.bind(this);
    }

    changeModelId(event) {
        let s = this.state.ship;
        s.modelId = event.target.value;
        s.pilotId = 0;
        // s.upgradeIds = {};
        // s.upgrades = {};
        this.setState({ ship: s });
        this.props.updateShip(s);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship) {
            this.setState({ ship: this.props.ship });
        }
    }

    getShips(faction) {
        let arr = [];

        for (let key in database.db.factions[faction].ships) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[faction].ships[key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        this.shipOptions = this.getShips(this.state.ship.faction.xws);

        return (
            <div className="block">
                <select value={this.state.ship.modelId} onChange={this.changeModelId}>
                    {this.shipOptions}
                </select>
                <Ship ship={this.state.ship} />
            </div>
        );
    }
}
