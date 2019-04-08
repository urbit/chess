const _jsxFileName = "/Users/logan/Dev/chess/src/js/router.js";import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { warehouse } from '/warehouse';
import { operator } from '/operator';
import { api } from '/api';
import { Root } from '/components/root';

class UrbitRouter {

  start() {
    if (warehouse) {
      this.renderRoot();
    } else {
      console.error("~~~ ERROR: Must initialize warehouse before operation ~~~");
    }
  }

  renderRoot() {
    let rootComponent = (
      React.createElement(Root, {
        api: api,
        store: warehouse.store,
        storeReports: warehouse.storeReports,
        pushCallback: warehouse.pushCallback,
        localSet: warehouse.localSet,
        localGet: warehouse.localGet,
        transitionTo: this.transitionTo, __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}} )
    )

    ReactDOM.render(rootComponent, document.querySelectorAll("#root")[0]);
  }
}

export let router = new UrbitRouter();
window.router = router;
