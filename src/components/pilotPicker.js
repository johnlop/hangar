import React, { Component } from 'react';
import * as database from '../data/database';
import Pilot from './pilot';

export default class PilotPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.changePilotId = this.changePilotId.bind(this);
        this.updateShip = this.updateShip.bind(this);
    }

    changePilotId(event) {
        let s = this.state.ship;
        s.pilotId = event.target.value;
        this.props.updateShip(s);
    }

    updateShip(s) {
        this.props.updateShip(s);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship) {
            this.setState({ ship: this.props.ship });
        }
    }

    getPilots(ship) {
        let arr = [];

        for (let key in database.db.factions[ship.faction.xws].ships[ship.modelId].pilots) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[ship.faction.xws].ships[ship.modelId].pilots[key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        this.pilotOptions = this.getPilots(this.state.ship);

        return (
            <div className="block">
                <select value={this.state.ship.pilotId} onChange={this.changePilotId}>
                    {this.pilotOptions}
                </select>
                <Pilot ship={this.state.ship} updateShip={this.updateShip} />
            </div>
        );
    }
}
