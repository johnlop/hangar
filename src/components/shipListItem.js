import React, { Component } from 'react';

export default class ShipListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { ship: props.ship };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onItemClick(this.props.ship);
    }

    render() {
        return (
            <div className="cell" onClick={this.handleClick}>
                {this.state.ship.pilot.name} ({this.state.ship.model.name})
            </div>
        );
    }
}
