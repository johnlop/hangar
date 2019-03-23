import React, { Component } from 'react';

export default class ShipList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getShips() {
        let arr = [];

        for (let s of this.state.ships) {
            arr.push(<div>{s}</div>);
        }

        return arr;
    }

    render() {
        return (
            <div>
                <div>{this.state.ships}</div>
            </div>
        );
    }
}
