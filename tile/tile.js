import React, { Component } from 'react';
import classnames from 'classnames';

/*
  Goes from:
    ~2018.7.17..23.15.09..5be5    // urbit @da
  To:
    (javascript Date object)
*/
const daToDate = (st) => {
  var dub = function(n) {
    return parseInt(n) < 10 ? "0" + parseInt(n) : n.toString();
  };
  var da = st.split('..');
  var bigEnd = da[0].split('.');
  var lilEnd = da[1].split('.');
  var ds = `${bigEnd[0].slice(1)}-${dub(bigEnd[1])}-${dub(bigEnd[2])}T${dub(lilEnd[0])}:${dub(lilEnd[1])}:${dub(lilEnd[2])}Z`;
  return new Date(ds);
};

export default class ChessTile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data);
    let list = [];
    for (var i = 0; i < this.props.data.list.length; i++) {
      let item = this.props.data.list[i];
      item.dates.sort((i, j) => {
        let a = daToDate(i).valueOf();
        let b = daToDate(j).valueOf();
        return a - b;
      });
      if (item.dates.length > 0) {
        let da = item.dates[0];
        list.push(
          <p><a className="white sans-serif"
            href={`/~chess/${item.ship}/${da}`}>
            {`→ ${item.ship}`}
          </a></p>
        );
      }
    }

    console.log(list);

    return (
      <div className="pa2 bg-dark-gray" style={{ width: 234, height: 234 }}>
        <img src="/~chess/img/ChessTile.png" />
        {list}
        <p>
          <a className="white sans-serif"
             href={`/~chess`}>
              {`See All Games`}
          </a>
        </p>
      </div>
    );
  }

}

window.chessTile = ChessTile;
