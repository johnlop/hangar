import React, { Component } from 'react';
import * as database from '../data/database';
import Pilot from './pilot';

export default class PilotPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, shipId: props.shipId, pilotId: 0 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ pilotId: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction || this.props.shipId !== prevProps.shipId) {
            this.setState({ faction: this.props.faction, shipId: this.props.shipId, pilotId: 0 });
        }
    }

    getPilots(faction, shipId) {
        let arr = [];

        for (let key in database.db.factions[faction].ships[shipId].pilots) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[faction].ships[shipId].pilots[key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        this.pilotOptions = this.getPilots(this.state.faction, this.state.shipId);

        return (
            <div>
                <select value={this.state.pilotId} onChange={this.handleChange}>
                    {this.pilotOptions}
                </select>
                <Pilot faction={this.state.faction} shipId={this.state.shipId} pilotId={this.state.pilotId} />
            </div>
        );
    }
}
