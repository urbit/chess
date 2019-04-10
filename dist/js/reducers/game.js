import _ from 'lodash';

const REPORT_KEYS = [
  "game"
];

class GameReducer {
  reduce(data, game) {
    REPORT_KEYS.forEach((type) => {
      let report = _.get(data, type, null);
      
      if (report === null) {
        //  no-op
      } else if (type === "game") {
        console.log(game);
        game = this.reportGame(report, game);
        console.log(report, game);
      }
    });

    return game;
  }

  reportGame(report, game) {
    return report;
  }
}

export let gameReducer = new GameReducer();
