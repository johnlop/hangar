import React, { Component } from 'react';
import * as database from '../data/database';
import { getUpgradeCost } from '../helpers/dbHelper';
// import Select from 'react-select';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship, type: props.type };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let s = this.state.ship;
        s.upgradeIds[this.state.type] = event.target.value;
        s.upgrades[this.state.type] = database.db.upgrades[this.state.type][event.target.value];
        //this.setState({ ship: s });
        this.props.changeUpgrade(this.state.type, event.target.value, s.upgrades[this.state.type]);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship || this.props.type !== prevProps.type) {
            this.setState({ ship: this.props.ship, type: this.props.type });
        }
    }

    getUpgrades(type) {
        let arr = [];

        for (let id in database.db.upgrades[type]) {
            let upg = database.db.upgrades[type][id];
            let cost = getUpgradeCost(this.state.ship, upg);
            arr.push(
                <option key={id} value={id}>
                    {`${database.db.upgrades[type][id].name} - ${cost}pts`}
                </option>,
                // { value: id, label: `${database.db.upgrades[type][id].name} - ${cost}pts` },
            );
        }

        return arr;
    }

    render() {
        this.upgradeOptions = this.getUpgrades(this.state.type);

        return (
            <div>
                {/* <Select
                    classNamePrefix="select"
                    value={this.state.ship.upgradeIds[this.state.type]}
                    options={this.upgradeOptions}
                    onChange={this.handleChange}
                /> */}

                <select value={this.state.ship.upgradeIds[this.state.type]} onChange={this.handleChange}>
                    {this.upgradeOptions}
                </select>
                <p>
                    {this.state.ship.upgrades[this.state.type]
                        ? this.state.ship.upgrades[this.state.type].sides[0].ability
                        : null}
                </p>
            </div>
        );
    }
}
