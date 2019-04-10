import React, { Component } from 'react';
import { Chess } from 'chess.js';

import { subscription } from '/subscription';
import { api } from '/lib/api';
import { daToDate } from '/lib/util';

export default class Game extends Component {

  constructor(props) {
    super(props);
    this.path = window.location.pathname.split("/");
    this.oShip = this.path[2];
    this.gameId = this.path[3];
    this.orientation = "";
    this.didIMove = false;
    this.game = new Chess();

    subscription.subscribe("/game/~" + this.oShip + "/" + this.gameId);
  }

  componentDidMount() {
    var cfg = {
      draggable: true,
      dropOffBoard: 'snapback', // this is the default
      position: 'start',
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this),
      onChange: this.onChangeFunc.bind(this)
    };

    this.board = ChessBoard('board', cfg);
  }

  componentDidUpdate(a, b, c) {
    this.board.position(event.fen);
    if (event.fen !== "") {
      this.game = new Chess(event.fen);
    } else {
      this.game = new Chess();
    }

    this.board.orientation(event.orientation);
    this.orientation = event.orientation;
  }

  onDragStart(source, piece, position, ori) {
    if (this.orientation === "white" && piece.search(/^b/) !== -1) {
      return false;
    } else if (this.orientation === "black" && piece.search(/^w/) !== -1) {
      return false;
    }

    if (this.game.in_checkmate() === true || this.game.in_draw() === true) {
      return false;
    }
  }

  onDrop(source, target) {
    // see if the move is legal
    var move = this.game.move({
      from: source,
      to: target,
      promotion: "q" // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return "snapback";
    this.didIMove = true;
  }

  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  onSnapEnd() {
    this.board.position(this.game.fen());
  }

  onChangeFunc(oldPos, newPos) {
    if (!this.didIMove) { return; }
    this.didIMove = false;
    let gid = Math.trunc(daToDate(this.gameId).getTime() / 1000);

    let fen = this.game.fen(); 
    api.chess({
      pos: { shp: this.oShip, gid: gid, pos: fen }
    });
  }

  render() {
    /*if ((this.game.turn() === "b" && this.orientation === "black") ||
      this.game.turn() === "w" && this.orientation === "white") {
    
    } else {
    
    }*/

    return (
      <div>
      <div id="header">
        <a href="/~chess">Back</a>
      </div>
      <div id="board" style={{ width: "400px" }}></div>
    </div>
    );
  }

}

