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
        this.ship = database.db.factions[faction].ships[shipId];
        this.pilot = database.db.factions[faction].ships[shipId].pilots[pilotId];
        this.slots = this.getSlots();
    }

    getSlots() {
        let arr = [];
        let i = 0;
        for (let s of this.pilot.slots) {
            let type = s.toLowerCase().replace(/ /g, '');
            arr.push(<UpgradePicker key={i} type={type} pilot={this.pilot} ship={this.ship} />);
            i++;
        }

        return arr;
    }

    render() {
        return (
            <div>
                <div>
                    <span className="pilot-skill">{this.pilot.initiative}</span> {this.pilot.limited === 1 && '•'}{' '}
                    <span className="title">{this.pilot.name}</span>{' '}
                    {this.pilot.caption ? <span className="fluff">({this.pilot.caption})</span> : null} -{' '}
                    {this.pilot.cost}pts
                </div>
                {/* <img src={this.pilot.image} height="400px"></img> */}
                <p>{this.pilot.ability}</p>
                {this.pilot.shipAbility ? (
                    <p>
                        <span className="title">
                            {this.pilot.shipAbility.name}
                            {':'}
                        </span>{' '}
                        {this.pilot.shipAbility.text}
                    </p>
                ) : null}
                <p className="fluff">{this.pilot.text}</p>
                <div>{this.slots}</div>
            </div>
        );
    }
}
