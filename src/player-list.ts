import { LitElement, html, css, nothing } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";

@customElement("player-list")
export class PlayerList extends LitElement {
  static styles = css`
    .player-list {
      color: white;
      text-align: center;
      font-family: Georgia, serif;
      font-size: 16px;
    }

    .player-list__field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-block-end: 10px;
    }
  `;

  @property({type: Array})
  players = [];

  @queryAll('input[type="text"')
  playerInputs!: HTMLInputElement[];

  handlePlayerNameChange() {
    let playerNames = [];
    Array.from(this.playerInputs).forEach(i => {
      if (i.value.length > 0) {
        playerNames.push({name: i.value});
      }
    });
    const customEvent = new CustomEvent('updateplayernames', {bubbles: true, detail: playerNames})
    this.dispatchEvent(customEvent)
  }

  render() {
    console.log("PL", this.players);
    const maxPlayerCount = [1,2,3,4,5,6];
    return html`<div class="player-list ${this.visible !== false ? "player-list--visible" : ""}">
      <h1>Who's playing?</h1>
      ${maxPlayerCount.map(id => {
        const playerName = this.players[id - 1] ? this.players[id - 1].name : '';
        return html`
          <div class="player-list__field">
            <label for=${`player${id}`}>Player ${id}</label>
            <input id=${`player${id}`} @keyup=${this.handlePlayerNameChange} type="text" value=${playerName}/>
          </div>
        `;
      })}
    </div>`;
  }
}
