import React, { Component } from 'react';

export default class SquadListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { squad: props.squad };
    }

    handleClick() {
        this.props.onItemClick(this.props.squad);
    }

    render() {
        return (
            <div className={'row ' + this.props.className}>
                <div className="squad-icon cell">
                    <img
                        src={`${process.env.PUBLIC_URL}/img/${this.state.squad.faction.xws}.png`}
                        alt={this.state.squad.faction.name}
                    />
                </div>
                <div className="cell">
                    <div className="title">
                        {this.state.squad.name} - {this.state.squad.cost}pts
                    </div>
                    <div className="fluff">{this.state.squad.type}</div>
                </div>
            </div>
        );
    }
}
