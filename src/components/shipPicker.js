import React, { Component } from 'react';
import * as database from '../data/database';

export default class ShipPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.shipOptions = this.getShips(props.faction);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.changeShip(event.target.value);
    }

    componentWillReceiveProps(props) {
        this.shipOptions = this.getShips(props.faction);
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
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                {this.shipOptions}
            </select>
        );
    }
}
