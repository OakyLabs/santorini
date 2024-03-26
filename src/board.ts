export function square(): number {
  return 0;
}

type Square = "[  ]" | "[ 1 ]" | "[ 2 ]";

const starting = 1;
const next = 2;

export type BoardGame = [Row, Row, Row, Row, Row];

export type Row = [number, number, number, number, number];

export class Board {
  boardGame: BoardGame = [
    [square(), square(), square(), square(), square()],
    [square(), square(), square(), square(), square()],
    [square(), square(), square(), square(), square()],
    [square(), square(), square(), square(), square()],
    [square(), square(), square(), square(), square()],
  ];

  #state: "player-choice" | "game-playing" | "game-over" = "player-choice";

  #order = [starting, next, next, starting] as const;
  #count = 0;
  #turn: 1 | 2 = next;

  drawBoard() {
    for (const row of this.boardGame) {
      let str = "";
      for (const col of row) {
        str += col + " ";
      }
      console.log(str);
    }
  }

  turn() {
    return this.#turn;
  }

  placeOnBoard(row: number, col: number, render: (boardGame: number) => void) {
    if (this.#state !== "player-choice") {
      return;
    }
    // logic to place on board
    if (row > this.boardGame.length) {
      return;
    }

    if (col > this.boardGame[row].length) {
      return;
    }

    // if (this.boardGame[row][col]) {
    //   return;
    // }

    const current = this.#order[this.#count];

    let shouldRender = false;

    if (!this.#count) {
      this.boardGame[row][col] = this.#order[this.#count];
      this.#count++;
      shouldRender = true;
    }

    if (!this.boardGame[row][col]) {
      this.boardGame[row][col] = this.#order[this.#count];
      this.#count++;
      shouldRender = true;
    }

    if (this.#count >= this.#order.length) {
      this.#state = "game-playing";
      shouldRender = true;
    }

    if (shouldRender) {
      render(current);
    }
    // state changes related to the class
    // render(current);
  }

  get state() {
    return this.#state;
  }
}

export function drawBoard() {
  const board = new Board();

  // board.placePlayer(0, 0);
  // board.placePlayer(0, 4);

  board.drawBoard();
}
