import { gameReducer } from '/reducers/game';
import { listReducer } from '/reducers/list';


class Store {
  constructor() {
    this.game = {};
    this.list = [];
    this.setState = () => {};
  }

  setStateHandler(setState) {
    this.setState = setState;
  }

  handleEvent(data) {
    let json = data.data;
   
    this.game = gameReducer.reduce(data.data, this.game);
    this.list = listReducer.reduce(data.data, this.list);

    this.setState({
      game: this.game,
      list: this.list
    });
  }
}

export let store = new Store();
window.store = store;
