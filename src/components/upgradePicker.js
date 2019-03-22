import React, { Component } from 'react';
import * as database from '../data/database';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = { type: props.type, upgradeId: 0 };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ upgradeId: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.setState({ type: this.props.type, upgradeId: 0 });
        }
    }

    getUpgrades(type) {
        let arr = [];

        for (let key in database.db.upgrades[type]) {
            arr.push(
                <option key={key} value={key}>
                    {`${database.db.upgrades[type][key].name} - ${database.db.upgrades[type][key].cost.value}pts`}
                </option>,
            );
        }

        return arr;
    }

    render() {
        this.upgradeOptions = this.getUpgrades(this.state.type);
        this.upgrade = database.db.upgrades[this.state.type][this.state.upgradeId];

        return (
            <div>
                <select value={this.state.upgradeId} onChange={this.handleChange}>
                    {this.upgradeOptions}
                </select>
                <div>{this.upgrade ? this.upgrade.sides[0].ability : null}</div>
            </div>
        );
    }
}
