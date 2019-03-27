import React, { Component } from 'react';
import * as database from '../data/database';

export default class FactionPicker extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction };

        this.handleChange = this.handleChange.bind(this);
        this.factionOptions = this.getFactions();
    }

    handleChange(event) {
        let faction = { xws: event.target.value, name: database.db.factions[event.target.value].name };
        this.setState({ faction: faction });
        this.props.changeFaction(faction);
    }

    getFactions() {
        let arr = [];

        for (let key in database.db.factions) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.factions[key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        return (
            <select value={this.state.faction.xws} onChange={this.handleChange}>
                {this.factionOptions}
            </select>
        );
    }
}
