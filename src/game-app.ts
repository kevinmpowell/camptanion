import { LitElement, html, css } from "lit";
import { customElement, state, queryAssignedElements, query } from "lit/decorators.js";

type Player = {
  name: string;
}

type Roll = {
  number: number;
  player: Player;
}

type Game = {
  id: number;
  start?: number;
  end?: number;
  players?: Player[];
  rollLog: Roll[];
};

@customElement("game-app")
export class GameApp extends LitElement {
  static styles = css`
    .game-app {
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      padding: 10px;
    }

    .game-app__end-game {
      margin-block-start: 10px;
      display: block;
      font-size: 16px;
      height: 40px;
      width: 100%;
      max-width: 120px;
      border-radius: 20px;
      border: none;
    }
  `;

  @state()
  private _playerTurnIndex: number = 0;

  @state()
  private _showGameStartOverlay: boolean = false;

  @queryAssignedElements({selector: 'turn-counter'})
  _turnCounter!: Array<HTMLElement>;

  @query('dice-overlay')
  diceOverlay!: HTMLElement;

  @query('game-start-overlay')
  gameStartOverlay!: HTMLElement;

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

    this.saveGame(game);
    return game;
  }

  get activeGamePlayers() {
    return this.activeGame.players || [];
  }

  get currentPlayer() {
    return this.activeGamePlayers[this._playerTurnIndex];
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
      const turnPlayer = this.currentPlayer;
      const game = this.activeGame;
      const rolledNumber = e.target.number;
      console.log(this._playerTurnIndex);
      console.log(`${turnPlayer.name} rolled a ${rolledNumber}`, this._playerTurnIndex);
      game.rollLog.push({
        number: rolledNumber,
        player: turnPlayer
      });
      this.saveGame(game);
      this.loadActiveGameState();

      this.diceOverlay.number = rolledNumber;
      this.diceOverlay.playerName = turnPlayer.name;
      this.diceOverlay.visible = true;
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
    game.rollLog.forEach(({ number }) => {
      numberCounts[number] = numberCounts[number] + 1;
    });

    for (const diceNumber in numberCounts) {
      const rollButton = turnCounter.querySelector(
        `roll-button[number="${diceNumber}"]`
      );
      const numberCount = numberCounts[diceNumber];
      const frequency = numberCount / game.rollLog.length;
      rollButton.counter = numberCounts[diceNumber];
      rollButton.frequency = frequency;
    }

    this._playerTurnIndex = game.rollLog.length % this.activeGamePlayers.length; // Figures out who's turn it is when the game is loaded (good for refreshing the page)

    console.log(game.start);

    if (game.start == undefined) {
      console.log(this.gameStartOverlay);
      this.gameStartOverlay.players = this.activeGamePlayers;
      this.gameStartOverlay.visible = true;
    } else {
      this.gameStartOverlay.visible = false;
    }
    // console.log("TURN", game.rollLog.length % this.activeGamePlayers.length);
  }

  firstUpdated() {
    this.loadActiveGameState();
  }

  handleGameEnd() {
    const game = this.activeGame;
    game.end = Date.now();
    this.saveGame(game);
    this.loadActiveGameState();
  }

  handleStartNewGame() {
    console.log("START IT UP!")
    const game = this.activeGame;
    game.start = Date.now();
    this.saveGame(game);
    this.loadActiveGameState();
  }

  handlePlayerNamesUpdate(e) {
    console.log("RECEIVED", e.detail);
    const game = this.activeGame;
    game.players = e.detail;
    this.saveGame(game);
    this.loadActiveGameState();
  }

  render() {
    return html`<div
      @click="${this.handleGameClick}"
      @undoroll=${this.handleUndo}
      @startnewgame=${this.handleStartNewGame}
      @updateplayernames=${this.handlePlayerNamesUpdate}
      class="game-app"
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
      <button class="game-app__end-game" @click=${this.handleGameEnd}>End Game</button>
      <dice-overlay></dice-overlay>
      <game-start-overlay></game-start-overlay>
    </div>`;
  }
}
