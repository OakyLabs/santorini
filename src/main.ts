import { Board, Row } from "./board.ts";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("");
}

const boardEl = document.querySelector(".board")!;

const board = new Board();

function draw(board: Board) {
  boardEl.innerHTML = "";
  board.boardGame.forEach((row, i) => {
    const rowEl = document.createElement("div");

    rowEl.classList.add("row");
    rowEl.dataset.row_number = `${i}`;

    createRow(rowEl, row, i);

    boardEl.appendChild(rowEl);
  });

  console.log(board.state);
  if (board.state === "game-playing") {
    //
    const turn = board.turn();

    const voila = document.querySelectorAll<HTMLElement>(
      `[data-player="${turn}"]`
    );

    voila.forEach((el) => {
      el.style.backgroundColor = "green";
    });
  }
}

draw(board);

function createSquare(i: number, col: number, parentId: number) {
  const el = document.createElement("div");

  if (col) {
    el.innerText = `${col}`;
  }

  el.classList.add("square");
  el.dataset.col_number = `${i}`;
  el.dataset.row_number = parentId.toString();

  el.dataset.id = `${parentId}-${i}`;

  if (col) {
    el.dataset.player = col.toString();
  }

  el.onclick = onClickSquare;

  return el;
}

function createRow(el: HTMLElement, row: Row, parentId: number) {
  row.forEach((col, i) => {
    el.appendChild(createSquare(i, col, parentId));
  });
}

function onClickSquare(evt: MouseEvent) {
  const target = evt.target as HTMLElement;

  if (board.state === "player-choice") {
    board.placeOnBoard(
      +target.dataset.row_number!,
      +target.dataset.col_number!,
      (player) => {
        target.innerText = player.toString();
        draw(board);
      }
    );
  }

  // new state
  if (board.state === "game-playing") {
    // time to play the game
  }
}
