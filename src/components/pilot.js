import React, { Component } from 'react';
import * as database from '../data/database';

export default class Pilot extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.pilotInfo = this.getInfo(props.faction, props.ship, props.pilot);
    }

    handleChange(event) {
        this.setState({faction: event.target.value}, this.changeFaction);
        this.props.changeFaction(event.target.value);
    }

    componentWillReceiveProps(props) {
        this.pilotInfo = this.getInfo(props.faction, props.ship, props.pilot);
    }

    getInfo(faction, ship, pilot) {
        return database.db.factions[faction].ships[ship].pilots[pilot];
    }

    render() {
        return (
            <div>
                <div>{this.pilotInfo.limited === 1 && '•'} {this.pilotInfo.name} <i>({this.pilotInfo.caption})</i></div>
                {/* <img src={this.pilotInfo.image} height="400px"></img> */}
                <div>{this.pilotInfo.ability}</div>
            </div>
        );
    }
}