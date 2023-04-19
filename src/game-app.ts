import { LitElement, html } from "lit";
import { customElement, state, queryAssignedElements } from "lit/decorators.js";
import { TurnCounter } from "./turn-counter";

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

  @queryAssignedElements({selector: 'turn-counter'})
  _turnCounter!: Array<HTMLElement>;

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
      this.loadActiveGameState();
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
    const turnCounter = this.renderRoot.querySelector("turn-counter");
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
      const numberCount = numberCounts[diceNumber];
      const frequency = numberCount / game.rollLog.length;
      console.log("DICE COUNT", diceNumber, frequency);
      rollButton.counter = numberCounts[diceNumber];
      rollButton.frequency = frequency;
    }
  }

  firstUpdated() {
    this.loadActiveGameState();
  }

  render() {
    return html`<div
      @click="${this.handleGameClick}"
      @undoroll=${this.handleUndo}
    >
      <turn-counter>
        <roll-button highlight number="2"></roll-button>
        <roll-button number="3"></roll-button>
        <roll-button number="4"></roll-button>
        <roll-button number="5"></roll-button>
        <roll-button number="6"></roll-button>
        <roll-button number="7"></roll-button>
        <roll-button number="8"></roll-button>
        <roll-button number="9"></roll-button>
        <roll-button number="10"></roll-button>
        <roll-button number="11"></roll-button>
        <roll-button number="12"></roll-button>
      </turn-counter>
    </div>`;
  }
}
