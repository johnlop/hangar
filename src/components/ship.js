import React, { Component } from 'react';
import * as database from '../data/database';

export default class Ship extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.shipInfo = this.getInfo(props.faction, props.ship);
    }

    handleChange(event) {
        this.setState({faction: event.target.value}, this.changeFaction);
        this.props.changeFaction(event.target.value);
    }

    componentWillReceiveProps(props) {
        this.shipInfo = this.getInfo(props.faction, props.ship);
    }

    getInfo(faction, ship) {
        return database.db.factions[faction].ships[ship];
    }

    render() {
        return (
            <div>{this.shipInfo.name}</div>
        );
    }
}