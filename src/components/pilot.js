import React, { Component } from 'react';
import * as database from '../data/database';
import UpgradePicker from './upgradePicker';

export default class Pilot extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship) {
            this.setState({ ship: this.props.ship });
        }
    }

    getInfo(ship) {
        this.ship = database.db.factions[ship.faction].ships[ship.modelId];
        this.pilot = database.db.factions[ship.faction].ships[ship.modelId].pilots[ship.pilotId];
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
        this.getInfo(this.state.ship);

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
