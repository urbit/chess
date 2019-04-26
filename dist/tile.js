const _jsxFileName = "/Users/logan/Dev/apps/chess/tile/tile.js";import React, { Component } from 'react';
import classnames from 'classnames';

export default class ChessTile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      React.createElement('div', { className: "pa2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}
        , React.createElement('p', { className: "sans-serif", __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}, "Chess")
      )
    );
  }

}

window.chessTile = ChessTile;
