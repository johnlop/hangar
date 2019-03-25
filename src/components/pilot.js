import React, { Component } from 'react';
import UpgradePicker from './upgradePicker';

export default class Pilot extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.changeUpgradeId = this.changeUpgradeId.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ship !== prevProps.ship) {
            this.setState({ ship: this.props.ship });
        }
    }

    changeUpgradeId(type, id, upgrade) {
        let s = this.state.ship;
        s.upgradeIds[type] = id;
        s.upgrades[type] = upgrade;
        //this.setState({ ship: s });
        this.props.updateShip(s);
    }

    getSlots() {
        let arr = [];
        let i = 0;
        for (let s of this.state.ship.pilot.slots) {
            let type = s.toLowerCase().replace(/ /g, '');
            arr.push(<UpgradePicker key={i} type={type} ship={this.state.ship} changeUpgrade={this.changeUpgradeId} />);
            i++;
        }

        return arr;
    }

    render() {
        this.slots = this.getSlots();

        return (
            <div>
                <div>
                    <span className="pilot-skill">{this.state.ship.pilot.initiative}</span>{' '}
                    {this.state.ship.pilot.limited === 1 && '•'}{' '}
                    <span className="title">{this.state.ship.pilot.name}</span>{' '}
                    {this.state.ship.pilot.caption ? (
                        <span className="fluff">({this.state.ship.pilot.caption})</span>
                    ) : null}{' '}
                    - {this.state.ship.pilot.cost}pts
                </div>
                {/* <img src={this.pilot.image} height="400px"></img> */}
                <p>{this.state.ship.pilot.ability}</p>
                {this.state.ship.pilot.shipAbility ? (
                    <p>
                        <span className="title">
                            {this.state.ship.pilot.shipAbility.name}
                            {':'}
                        </span>{' '}
                        {this.state.ship.pilot.shipAbility.text}
                    </p>
                ) : null}
                <p className="fluff">{this.state.ship.pilot.text}</p>
                <div>{this.slots}</div>
            </div>
        );
    }
}
