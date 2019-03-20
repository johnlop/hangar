import React, { Component } from 'react';
import './App.css';
import * as database from './data/database';
import FactionPicker from './components/factionPicker';

export default class App extends Component {

    constructor() {
        super();
        database.load();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Hello
                    <FactionPicker></FactionPicker>
                </header>
            </div>
        );
    }
}