import _ from 'lodash';
import { router } from '/router';

const REPORT_KEYS = [
]

class UrbitWarehouse {
  constructor() {
    this.store = {
      game: {},
      list: {}
    };

    this.reports = this.buildReports();
  }

  buildReports() {
    let reports = {};

    REPORT_KEYS.forEach((type) => {
      // TOOD: dataKeys are here because report fragments don't contain all the
      // data we need to process; sometimes we need to grab the whole chain
      let [reportKey, dataKey] = type.split("/");

      reports[reportKey] = {
        callbacks: [],
        dataKey: (dataKey) ? dataKey : reportKey
      }
    })

    return reports;
  }

  storePollResponse(data) {
    let newReports = [];
    let reportTypes = Object.keys(this.reports);
    let json = data.data;

    reportTypes.forEach((type) => {
      let reportData = _.get(json, type, null);

      newReports.push({
        type: type,
        data: reportData,
        from: data.from
      });
    });

    this.storeReports(newReports);
  }

  storeReports(newReports) {
    newReports.forEach((rep) => console.log('new report: ', rep));
    console.log('full store = ', this.store);

    router.renderRoot();
  }
}

export let warehouse = new UrbitWarehouse();
window.warehouse = warehouse;
