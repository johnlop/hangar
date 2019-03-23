import React, { Component } from 'react';
import * as database from '../data/database';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship, pilot: props.pilot, type: props.type, upgradeId: 0 };

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
            let upg = database.db.upgrades[type][key];
            let cost = 999;
            if (upg.cost) {
                if (upg.cost.value !== undefined) {
                    cost = upg.cost.value;
                } else if (upg.cost.variable) {
                    let stat = upg.cost.variable;
                    if (stat === 'initiative') {
                        cost = upg.cost.values[this.state.pilot.initiative];
                    } else if (stat === 'size') {
                        cost = upg.cost.values[this.state.ship.size];
                    } else {
                        cost = upg.cost.values[this.state.ship.statsMap[stat]];
                    }
                }
            }
            arr.push(
                <option key={key} value={key}>
                    {`${database.db.upgrades[type][key].name} - ${cost}pts`}
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
                <p>{this.upgrade ? this.upgrade.sides[0].ability : null}</p>
            </div>
        );
    }
}
