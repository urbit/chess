const _jsxFileName = "/Users/logan/Dev/chess/src/index.js";import React from 'react';
import ReactDOM from 'react-dom';

import { subscription } from "/subscription";
import App from '/app';
import { Chessboard } from '/vendor/chessboard-js';


subscription.setAuthTokens({
  ship: window.ship
});

ReactDOM.render(React.createElement(App, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 13}} ), document.querySelectorAll("#root")[0]);

