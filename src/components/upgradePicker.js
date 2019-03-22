import React, { Component } from 'react';
import * as database from '../data/database';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.upgradeOptions = this.getUpgrades(props.type);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentWillReceiveProps(props) {
        this.upgradeOptions = this.getUpgrades(props.type);
    }

    getUpgrades(type) {
        let arr = [];

        for (let key in database.db.upgrades[type]) {
            arr.push(
                <option key={key} value={key}>
                    {database.db.upgrades[type][key].name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                {this.upgradeOptions}
            </select>
        );
    }
}
