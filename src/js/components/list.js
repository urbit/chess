import React, { Component } from 'react';
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
          <p>
            <a href={`/~chess/${item.ship}/${da}`}>{`${item.ship} - ${da}`}</a>
          </p>
        );
      });
    }

    return (
      <div>
        <p>Ship: </p>
        <input type="text" value={this.state.shipName} onChange={this.handleInput.bind(this)} />
        <button onClick={this.createGame.bind(this)}>Create</button>
        <div>
          {list}
        </div>
      </div>
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

