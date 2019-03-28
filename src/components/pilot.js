import React, { Component } from 'react';
import UpgradePicker from './upgradePicker';
import ModalImage from 'react-modal-image';

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

    changeUpgradeId(slotId, id, upgrade) {
        let s = this.state.ship;
        s.upgradeIds[slotId] = id;
        s.upgrades[slotId] = upgrade;
        //this.setState({ ship: s });
        this.props.updateShip(s);
    }

    getSlots() {
        let arr = [];
        let i = 0;
        for (let s of this.state.ship.pilot.slots) {
            let type = s.toLowerCase().replace(/ /g, '');
            arr.push(
                <UpgradePicker
                    key={i}
                    type={type}
                    slotId={i}
                    ship={this.state.ship}
                    changeUpgrade={this.changeUpgradeId}
                />,
            );
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
                    <ModalImage
                        className="card-image"
                        small={this.state.ship.model.icon}
                        large={this.state.ship.pilot.image}
                    />
                </div>
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
