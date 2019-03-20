import React, { Component } from 'react';
import * as database from '../data/database';

export default class FactionPicker extends Component {

    constructor() {
        super();
        this.state = {value: 'scumandvillainy'};

        database.load();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    factionOptions() {
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
            <select value={this.state.value} onChange={this.handleChange}>{this.factionOptions()}</select>
        );
    }
}