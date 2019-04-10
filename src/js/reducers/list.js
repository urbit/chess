import _ from 'lodash';

const REPORT_KEYS = [
  "list"
];



class ListReducer {
  reduce(data, list) {
    REPORT_KEYS.forEach((type) => {
      let report = _.get(data, type, null);
      
      if (report === null) {
        //  no-op
      } else if (type === "list") {
        list = this.reportList(report, list);
      }
    });

    return list;
  }

  reportList(data, list) {
    return data;
  }
}

export let listReducer = new ListReducer();
