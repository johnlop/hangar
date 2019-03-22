import React, { Component } from 'react';
import * as database from '../data/database';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = { type: props.type, value: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.upgradeOptions = this.getUpgrades(props.type);
        this.getSelectedUpgrade(0);
    }

    handleChange(event) {
        this.getSelectedUpgrade(event.target.value);
        this.setState({ value: event.target.value });
    }

    componentWillReceiveProps(props) {
        this.upgradeOptions = this.getUpgrades(props.type);
        this.getSelectedUpgrade();
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

    getSelectedUpgrade(value) {
        this.upgrade = database.db.upgrades[this.state.type][value];
    }

    render() {
        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange}>
                    {this.upgradeOptions}
                </select>
                <div>{this.upgrade ? this.upgrade.sides[0].ability : null}</div>
            </div>
        );
    }
}
