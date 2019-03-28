import React, { Component } from 'react';
import * as database from '../data/database';
import { getUpgradeCost } from '../helpers/dbHelper';
// import Select from 'react-select';

export default class UpgradePicker extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship, slotId: props.slotId };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let type = this.state.ship.pilot.slots[this.state.slotId].toLowerCase().replace(/ /g, '');
        let s = this.state.ship;
        s.upgradeIds[this.state.slotId] = event.target.value;
        s.upgrades[this.state.slotId] = database.db.upgrades[type][event.target.value];
        //this.setState({ ship: s });
        this.props.changeUpgrade(this.state.slotId, event.target.value, s.upgrades[this.state.slotId]);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship || this.props.slotId !== prevProps.slotId) {
            this.setState({ ship: this.props.ship, slotId: this.props.slotId });
        }
    }

    getUpgrades(type) {
        let arr = [];

        for (let id in database.db.upgrades[type]) {
            let good = true;
            let upg = database.db.upgrades[type][id];
            if (upg.restrictions) {
                for (let r of upg.restrictions) {
                    if (r['factions']) {
                        if (!r['factions'].includes(this.state.ship.faction.name)) {
                            good = false;
                            break;
                        }
                    } else if (r['sizes']) {
                        if (!r['sizes'].includes(this.state.ship.model.size)) {
                            good = false;
                            break;
                        }
                    } else if (r['ships']) {
                        if (!r['ships'].includes(this.state.ship.model.xws)) {
                            good = false;
                            break;
                        }
                    } else if (r['action']) {
                        let foundIt = false;
                        for (let a of this.state.ship.model.actions) {
                            if (a.type === r['action'].type && a.difficulty === r['action'].difficulty) {
                                foundIt = true;
                                break;
                            }
                        }
                        good = foundIt;
                        break;
                    } else if (r['equipped']) {
                        let foundIt = false;
                        for (let e of r['equipped']) {
                            let installedUpgrade = this.state.ship.upgrades[e.toLowerCase().replace(/ /g, '')];
                            if (installedUpgrade && !installedUpgrade.name.startsWith('No')) {
                                foundIt = true;
                                break;
                            }
                            foundIt = false;
                        }
                        good = foundIt;
                        break;
                    }
                }
            }
            if (good) {
                let cost = getUpgradeCost(this.state.ship, upg);
                arr.push(
                    <option key={id} value={id}>
                        {`${upg.name} - ${cost}pts`}
                    </option>,
                    // { value: id, label: `${upg.name} - ${cost}pts` },
                );
            }
        }

        return arr;
    }

    render() {
        let type = this.state.ship.pilot.slots[this.state.slotId].toLowerCase().replace(/ /g, '');
        this.upgradeOptions = this.getUpgrades(type);

        return (
            <div>
                {/* <Select
                    classNamePrefix="select"
                    value={this.state.ship.upgradeIds[this.state.type]}
                    options={this.upgradeOptions}
                    onChange={this.handleChange}
                /> */}

                <select value={this.state.ship.upgradeIds[this.state.slotId]} onChange={this.handleChange}>
                    {this.upgradeOptions}
                </select>
                <p>{this.state.ship.upgrades[this.state.slotId].sides[0].ability}</p>
                {this.state.ship.upgrades[this.state.slotId].sides[1] ? (
                    <p>
                        <span className="title">Back:</span>{' '}
                        {this.state.ship.upgrades[this.state.slotId].sides[1].ability}
                    </p>
                ) : null}
            </div>
        );
    }
}
