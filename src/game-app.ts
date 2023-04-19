import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";

type Game = {
  id: number;
  start?: number;
  end?: number;
  rollLog: number[];
};

@customElement("game-app")
export class GameApp extends LitElement {
  @state()
  private _gameInProgress = false;

  get gameState() {
    const savedGameState = localStorage.getItem("boardGameScoreboardData");
    return savedGameState === null ? { games: {} } : JSON.parse(savedGameState);
  }

  get games() {
    return this.gameState.games;
  }

  get gameIds() {
    return Object.keys(this.games);
  }

  get unfinishedGame() {
    const unfinishedGameId = this.gameIds.find(
      (gid) => this.games[gid].end === undefined
    );
    return unfinishedGameId ? this.games[unfinishedGameId] : null;
  }

  get activeGame() {
    let game: Game | null = this.unfinishedGame;
    if (!game) {
      game = this.createNewGame();
    }

    if (!game.start) {
      game.start = Date.now();
    }

    this.saveGame(game);
    return game;
  }

  saveGame(game: Game) {
    const gameState = this.gameState;
    gameState.games[game.id] = game;

    localStorage.setItem("boardGameScoreboardData", JSON.stringify(gameState));
  }

  findGameById(id) {
    return this.gameState.games[id];
  }

  createNewGame() {
    const newGame: Game = {
      id: this.gameIds.length,
      rollLog: []
    };
    return newGame;
  }

  handleGameClick(e) {
    // If a roll button is clicked, get the current game, make sure it's started, and log the dice roll
    if (e.target.nodeName === "ROLL-BUTTON") {
      const game = this.activeGame;
      game.rollLog.push(e.target.number);
      this.saveGame(game);
    }
  }

  handleUndo(e) {
    const game = this.activeGame;
    game.rollLog.pop();
    this.saveGame(game);
    this.loadActiveGameState();
  }

  loadActiveGameState() {
    const game = this.activeGame;
    const turnCounter = this.querySelector("turn-counter");
    turnCounter.counter = game.rollLog.length;
    const numberCounts = {
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0
    };
    game.rollLog.forEach((roll) => {
      numberCounts[roll] = numberCounts[roll] + 1;
    });
    for (const diceNumber in numberCounts) {
      const rollButton = turnCounter.querySelector(
        `roll-button[number="${diceNumber}"]`
      );
      rollButton.counter = numberCounts[diceNumber];
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadActiveGameState();
  }

  render() {
    return html`<div
      @click="${this.handleGameClick}"
      @undoroll=${this.handleUndo}
    >
      <slot></slot>
    </div>`;
  }
}
