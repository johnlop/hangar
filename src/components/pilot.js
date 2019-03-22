import React, { Component } from 'react';
import * as database from '../data/database';
import UpgradePicker from './upgradePicker';

export default class Pilot extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, shipId: props.shipId, pilotId: props.pilotId };

        this.handleChange = this.handleChange.bind(this);
        this.getInfo(props.faction, props.shipId, props.pilotId);
    }

    handleChange(event) {
        this.setState({ faction: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.faction !== prevProps.faction ||
            this.props.shipId !== prevProps.shipId ||
            this.props.pilotId !== prevProps.pilotId
        ) {
            this.setState({ faction: this.props.value });
            this.getInfo(this.props.faction, this.props.shipId, this.props.pilotId);
        }
    }

    getInfo(faction, shipId, pilotId) {
        this.pilotInfo = database.db.factions[faction].ships[shipId].pilots[pilotId];
        this.slots = this.getSlots();
    }

    getSlots() {
        let arr = [];

        for (let s of this.pilotInfo.slots) {
            let type = s.toLowerCase().replace(/ /g, '');
            arr.push(<UpgradePicker type={type} />);
        }

        return arr;
    }

    render() {
        return (
            <div>
                <div>
                    <b className={'pilot-skill'}>{this.pilotInfo.initiative}</b> {this.pilotInfo.limited === 1 && '•'}{' '}
                    {this.pilotInfo.name} {this.pilotInfo.caption ? <i>({this.pilotInfo.caption})</i> : null} -{' '}
                    {this.pilotInfo.cost}pts
                </div>
                {/* <img src={this.pilotInfo.image} height="400px"></img> */}
                <div>{this.pilotInfo.ability}</div>
                <div>
                    {this.pilotInfo.shipAbility
                        ? `${this.pilotInfo.shipAbility.name}: ${this.pilotInfo.shipAbility.text}`
                        : null}
                </div>
                <div>{this.pilotInfo.text}</div>
                <div>{this.slots}</div>
            </div>
        );
    }
}
