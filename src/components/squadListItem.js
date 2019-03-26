import React, { Component } from 'react';

export default class SquadListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { squad: props.squad };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onItemClick(this.props.squad);
    }

    render() {
        return (
            <div className={'row ' + this.props.className} onClick={this.handleClick}>
                <div className="cell">
                    <div className="title">
                        {this.state.squad.name} - {this.state.squad.cost}pts
                    </div>
                </div>
            </div>
        );
    }
}
