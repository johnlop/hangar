import React, { Component } from 'react';
import * as database from '../data/database';

export default class Pilot extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.getInfo(props.faction, props.ship, props.pilot);
    }

    handleChange(event) {
        this.setState({faction: event.target.value}, this.changeFaction);
        this.props.changeFaction(event.target.value);
    }

    componentWillReceiveProps(props) {
        this.getInfo(props.faction, props.ship, props.pilot);
    }

    getInfo(faction, ship, pilot) { 
        this.pilotInfo = database.db.factions[faction].ships[ship].pilots[pilot];
        this.slots = this.getSlots();
    }

    getSlots(){
        let arr = [];

        for(let s of this.pilotInfo.slots){
            arr.push(<span>{s}</span>);
        }

        return arr;
    }

    render() {
        return (
            <div>
                <div>{this.pilotInfo.limited === 1 && '•'} {this.pilotInfo.name} {this.pilotInfo.caption ? <i>({this.pilotInfo.caption})</i> : null} - {this.pilotInfo.cost}pts</div>
                {/* <img src={this.pilotInfo.image} height="400px"></img> */}
                <div>{this.pilotInfo.ability}</div>
                <div>{this.pilotInfo.text}</div>
                <div>{this.slots}</div>
            </div>
        );
    }
}