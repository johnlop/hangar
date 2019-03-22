import React, { Component } from 'react';
import * as database from '../data/database';

export default class Ship extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.loadInfo(props.faction, props.ship);
    }

    handleChange(event) {
        this.setState({faction: event.target.value}, this.changeFaction);
        this.props.changeFaction(event.target.value);
    }

    componentWillReceiveProps(props) {
        this.loadInfo(props.faction, props.ship);
    }

    loadInfo(faction, ship) {
        this.shipInfo = database.db.factions[faction].ships[ship];
        this.shipDial = this.getDial();
        this.shipActions = this.getActions();
        this.shipStats = this.getStats();
    }

    getDial() {
        let dial = [];
        let builder = {};
        for(let m of this.shipInfo.dial){
            let c = m.split('');
            let speed = parseInt(c[0]);
            let col = '#fff';
            if (c[2] === 'B'){
                col = '#88F';
            }
            else if (c[2] === 'R') {
                col = '#F33';
            }
            let font = 'xwing-miniatures-font xwing-miniatures-font-';
            switch (c[1]){
                case 'O': font += 'stop';
                    break;
                case 'S': font += 'reversestraight';
                    speed = -speed;
                    break;
                case 'A': font += 'reversebankleft';
                    speed = -speed;
                    break;
                case 'D': font += 'reversebankright';
                    speed = -speed;
                    break;
                case 'E': font += 'trollleft';
                    break;
                case 'T': font += 'turnleft';
                    break;
                case 'B': font += 'bankleft';
                    break;
                case 'F': font += 'straight';
                    break;
                case 'N': font += 'bankright';
                    break;
                case 'Y': font += 'turnright';
                    break;
                case 'R': font += 'trollright';
                    break;
                case 'L': font += 'sloopleft';
                    break;
                case 'P': font += 'sloopright';
                    break;
                case 'K': font += 'kturn';
                    break;
                default: 
                    break;
            }
            let el = <i style={{color: col}} className={font}></i>;
            
            if (!builder[speed]){
                builder[speed] = [];
            }
            builder[speed].push(el);
        }

        let ba = [];
        for (let b in builder){
            ba.push([b, builder[b]]);
        }
        ba.sort((a,b) => {
            return b[0] - a[0];
        });

        for (let i in ba){
            let speed = <div>{ba[i][0]} - {ba[i][1]}</div>;
            dial.push(speed);
        }

        return dial;
    }

    getActions() {
        let act = [];
        
        for (let a of this.shipInfo.actions){
            let col = '#fff';
            if (a.difficulty === 'Red'){
                col = '#F33';
            }
            let font = 'xwing-miniatures-font xwing-miniatures-font-' + a.type.toLowerCase().replace(/ /g, '');
            let el = <i style={{color: col}} className={font}></i>;
            act.push(el);
        }

        return act;
    }

    getStats(){
        let stats = [];

        for(let s of this.shipInfo.stats){
            let col = '#fff';
            let font = 'xwing-miniatures-font xwing-miniatures-font-';
            if (s.type === 'attack'){
                font += s.arc.toLowerCase().replace(/ /g, '');
                col = '#f33';
            }else if (s.type === 'agility'){
                font += 'agility';
                col = '#6F6';
            }else if (s.type === 'hull'){
                font += 'hull';
                col = '#FF6';
            }else if (s.type === 'shields'){
                font += 'shield';
                col = '#66F';
            }
            let el = <span> {s.value} <i style={{color: col}} className={font}></i></span>;
            stats.push(el);
        }

        return stats;
    }

    render() {
        return (
            <div>
                <div>{this.shipInfo.name}</div>
                <div>{this.shipStats}</div>
                <div>{this.shipActions}</div>
                <div>{this.shipDial}</div>
            </div>
        );
    }
}