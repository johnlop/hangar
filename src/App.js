import React, { Component } from 'react';
import './App.css';

const factions = require('./data/factions/factions.json');

class App extends Component {
    buildOptions() {
        const arr = [];

        for (let f of factions) {
            arr.push(
                <option key={f.xws} value="{f.xws}">
                    {f.name}
                </option>,
            );
        }

        return arr;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Hello
                    <select>{this.buildOptions()}</select>
                </header>
            </div>
        );
    }
}

export default App;
