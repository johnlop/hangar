import React, { Component } from 'react';
import * as database from '../data/database';

export default class Ship extends Component {
    constructor(props) {
        super(props);

        this.state = { faction: props.faction, shipId: props.shipId };

        this.handleChange = this.handleChange.bind(this);
        this.loadInfo(props.faction, props.shipId);
    }

    handleChange(event) {
        this.setState({ faction: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (this.props.faction !== prevProps.faction || this.props.shipId !== prevProps.shipId) {
            this.setState({ faction: this.props.faction });
            this.loadInfo(this.props.faction, this.props.shipId);
        }
    }

    loadInfo(faction, shipId) {
        this.shipInfo = database.db.factions[faction].ships[shipId];
        this.shipDial = this.getDial();
        this.shipActions = this.getActions();
        this.shipStats = this.getStats();
    }

    getDial() {
        let dial = [];
        let builder = {};
        for (let m of this.shipInfo.dial) {
            let c = m.split('');
            let speed = parseInt(c[0]);
            let col = 'white';
            if (c[2] === 'B') {
                col = 'blue';
            } else if (c[2] === 'R') {
                col = 'red';
            }
            let font = 'xwing-miniatures-font xwing-miniatures-font-';
            switch (c[1]) {
                case 'O':
                    font += 'stop';
                    break;
                case 'S':
                    font += 'reversestraight';
                    speed = -speed;
                    break;
                case 'A':
                    font += 'reversebankleft';
                    speed = -speed;
                    break;
                case 'D':
                    font += 'reversebankright';
                    speed = -speed;
                    break;
                case 'E':
                    font += 'trollleft';
                    break;
                case 'T':
                    font += 'turnleft';
                    break;
                case 'B':
                    font += 'bankleft';
                    break;
                case 'F':
                    font += 'straight';
                    break;
                case 'N':
                    font += 'bankright';
                    break;
                case 'Y':
                    font += 'turnright';
                    break;
                case 'R':
                    font += 'trollright';
                    break;
                case 'L':
                    font += 'sloopleft';
                    break;
                case 'P':
                    font += 'sloopright';
                    break;
                case 'K':
                    font += 'kturn';
                    break;
                default:
                    break;
            }

            if (!builder[speed]) {
                builder[speed] = [];
            }
            let el = <i key={builder[speed].length - 1} className={font + ' ' + col} />;
            builder[speed].push(el);
        }

        let ba = [];
        for (let b in builder) {
            ba.push([b, builder[b]]);
        }
        ba.sort((a, b) => {
            return b[0] - a[0];
        });

        for (let i in ba) {
            let speed = (
                <div key={dial.length}>
                    {ba[i][0]} - {ba[i][1]}
                </div>
            );
            dial.push(speed);
        }

        return dial;
    }

    getActions() {
        let act = [];
        for (let a of this.shipInfo.actions) {
            let col = 'white';
            if (a.difficulty === 'Red') {
                col = 'red';
            }
            let font = 'xwing-miniatures-font xwing-miniatures-font-' + a.type.toLowerCase().replace(/ /g, '');
            let el = <i key={act.length} className={font + ' ' + col} />;
            act.push(el);
        }

        return act;
    }

    getStats() {
        let stats = [];

        for (let s of this.shipInfo.stats) {
            let col = 'white';
            let className = 'xwing-miniatures-font xwing-miniatures-font-';
            if (s.type === 'attack') {
                className += s.arc.toLowerCase().replace(/ /g, '');
                col = 'red';
            } else if (s.type === 'agility') {
                className += 'agility';
                col = 'green';
            } else if (s.type === 'hull') {
                className += 'hull';
                col = 'yellow';
            } else if (s.type === 'shields') {
                className += 'shield';
                col = 'blue';
            }
            let el = (
                <span key={stats.length} className={col}>
                    {' '}
                    <i key={stats.length} className={className} /> <span className="title">{s.value}</span>
                </span>
            );
            stats.push(el);
        }

        stats.push(
            <span key={stats.length}>
                {' '}
                <i
                    key={stats.length}
                    className={'xwing-miniatures-font xwing-miniatures-font-base-' + this.shipInfo.size.toLowerCase()}
                />
            </span>,
        );

        return stats;
    }

    render() {
        return (
            <div>
                <div className="title">{this.shipInfo.name}</div>
                <div>{this.shipStats}</div>
                <div>{this.shipActions}</div>
                <div>{this.shipDial}</div>
            </div>
        );
    }
}
