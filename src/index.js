import React from 'react';
import ReactDOM from 'react-dom';

import { subscription } from "/subscription";
import App from '/app';
import { Chessboard } from '/vendor/chessboard-js';


subscription.setAuthTokens({
  ship: window.ship
});

ReactDOM.render(<App />, document.querySelectorAll("#root")[0]);

