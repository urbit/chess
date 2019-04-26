const _jsxFileName = "/Users/logan/Dev/apps/chess/src/js/app.js";import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { store } from '/store';
import List from '/components/list';
import Game from '/components/game';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      game: store.game,
      list: store.list
    };

    store.setStateHandler(this.setState.bind(this));
  }

  render() {
    return (
       React.createElement(BrowserRouter, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}
         , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
          , React.createElement(Route, { exact: true, path: "/~chess", 
            render:  (props) => {
              return React.createElement(List, { ...props, list: this.state.list, __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} )
            }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )
          , React.createElement(Route, { path: "/~chess/:ship/:id", 
            render:  (props) => {
              return React.createElement(Game, { ...props, game: this.state.game, __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}} )
            }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}} )
        )
      )
    );
  }
}

window.app = App;
