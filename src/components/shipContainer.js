import React, { Component } from 'react';
import ShipPicker from './shipPicker';
import PilotPicker from './pilotPicker';
import Pilot from './pilot';
import Ship from './ship';

export default class ShipContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {faction: props.faction, ship: 0, pilot: 0};

        this.changeShip = this.changeShip.bind(this);
        this.changePilot = this.changePilot.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({faction: props.faction, ship: 0, pilot: 0});
    }

    changeShip(value) {
        this.setState({ship: value, pilot: 0});
    }

    changePilot(value) {
        this.setState({pilot: value});
    }

    render() {
        return (
            <div>
                <ShipPicker faction={this.state.faction} changeShip={this.changeShip}></ShipPicker>
                <PilotPicker faction={this.state.faction} ship={this.state.ship} changePilot={this.changePilot}></PilotPicker>
                <Ship faction={this.state.faction} ship={this.state.ship}></Ship>
                <Pilot faction={this.state.faction} ship={this.state.ship} pilot={this.state.pilot}></Pilot>
            </div>
        );
    }
}