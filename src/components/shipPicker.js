import React, { Component } from 'react';
import * as database from '../data/database';
import Ship from './ship';

export default class ShipPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, ship: 0 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ ship: event.target.value });
        this.props.changeShip(event.target.value);
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction) {
            this.setState({ faction: this.props.faction, ship: 0 });
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
        this.shipOptions = this.getShips(this.state.faction);

        return (
            <div>
                <select value={this.state.ship} onChange={this.handleChange}>
                    {this.shipOptions}
                </select>
                <Ship faction={this.state.faction} ship={this.state.ship} />
            </div>
        );
    }
}
