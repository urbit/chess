const _jsxFileName = "/Users/logan/Dev/apps/chess/src/js/components/list.js";import React, { Component } from 'react';
import { subscription } from '/subscription';
import { api } from '/lib/api';

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shipName: ''
    };

    subscription.subscribe("/list");
  }

  handleInput(event) {
    this.setState({ shipName: event.target.value });
  }

  render() {
    let list = [];
    for (var i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      item.dates.forEach((da) => {
        list.push(
          React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
            , React.createElement('a', { href: `/~chess/${item.ship}/${da}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}, `${item.ship} - ${da}`)
          )
        );
      });
    }

    return (
      React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
        , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "Ship: " )
        , React.createElement('input', { type: "text", value: this.state.shipName, onChange: this.handleInput.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}} )
        , React.createElement('button', { onClick: this.createGame.bind(this), __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, "Create")
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
          , list
        )
      )
    );
  }

  createGame() {
    api.chess({
      new: {
        shp: this.state.shipName,
        gid: Math.trunc(new Date().getTime() / 1000),
        ori: Math.random() > 0.5 ? 'white' : 'black'
      }
    });
  }

}

