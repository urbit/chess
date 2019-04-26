import React, { Component } from 'react';
import classnames from 'classnames';

export default class ChessTile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="pa2">
        <p className="sans-serif">Chess</p>
      </div>
    );
  }

}

window.chessTile = ChessTile;
