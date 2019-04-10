import React, { Component } from 'react';
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
       <BrowserRouter>
        <div>
          <Route exact path="/~chess" 
            render={ (props) => {
              return <List {...props} list={this.state.list} />
            }} />
          <Route path="/~chess/:ship/:id" 
            render={ (props) => {
              return <Game {...props} game={this.state.game} />
            }} />
        </div>
      </BrowserRouter>
    );
  }
}

