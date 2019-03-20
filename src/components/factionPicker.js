import React, { Component } from 'react';
import * as database from '../data/database';

export default class FactionPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.factionOptions = this.getFactions();
    }

    handleChange(event) {
        this.setState({faction: event.target.value}, this.changeFaction);
        this.props.changeFaction(event.target.value);
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
            <select value={this.state.faction} onChange={this.handleChange}>{this.factionOptions}</select>
        );
    }
}