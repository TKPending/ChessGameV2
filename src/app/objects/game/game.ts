import Chessboard from "@/app/board/chessboard";
import Player from "@/app/objects/players/player";

export default class Game {
  constructor() {
    this.board = new Chessboard();
    this.players = [
      new Player("Player 1", "white"),
      new Player("Player 2", "black"),
    ];
  }
}
