import React, { Component } from 'react';
import * as database from '../data/database';
import Pilot from './pilot';

export default class PilotPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, ship: props.ship, pilot: 0 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ pilot: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction || this.props.ship !== prevProps.ship) {
            this.setState({ faction: this.props.faction, ship: this.props.ship, pilot: 0 });
        }
    }

    getPilots(faction, ship) {
        let arr = [];

        for (let key in database.db.factions[faction].ships[ship].pilots) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[faction].ships[ship].pilots[key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        this.pilotOptions = this.getPilots(this.state.faction, this.state.ship);

        return (
            <div>
                <select value={this.state.pilot} onChange={this.handleChange}>
                    {this.pilotOptions}
                </select>
                <Pilot faction={this.state.faction} ship={this.state.ship} pilot={this.state.pilot} />
            </div>
        );
    }
}
