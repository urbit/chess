import { api } from '/api';
import { warehouse } from '/warehouse';


export class UrbitOperator {
  constructor() {
  }

  start() {
    if (api.authTokens) {
      this.initializeLandscape();
    } else {
      console.error("~~~ ERROR: Must set api.authTokens before operation ~~~");
    }
  }

  initializeLandscape() {

/*    api.bind(`/primary`, "PUT", api.authTokens.ship, 'collections',
      this.handleEvent.bind(this),
      this.handleError.bind(this));*/
  }

  handleEvent(diff) {
    console.log('handleEvent', diff);
    warehouse.storePollResponse(diff);
  }

  handleError(err) {
    console.log(err);
    api.bind(`/primary`, "PUT", api.authTokens.ship, 'collections',
      this.handleEvent.bind(this),
      this.handleError.bind(this));
  }
}

export let operator = new UrbitOperator();
window.operator = operator;
