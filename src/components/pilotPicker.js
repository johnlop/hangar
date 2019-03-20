import React, { Component } from 'react';
import * as database from '../data/database';

export default class PilotPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);

        this.pilotOptions = this.getPilots(props.faction, props.ship);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentWillReceiveProps(props) {
        this.pilotOptions = this.getPilots(props.faction, props.ship);
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
        return (
            <select value={this.state.value} onChange={this.handleChange}>{this.pilotOptions}</select>
        );
    }
}