import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("game-start-overlay")
export class GameStartOverlay extends LitElement {
  static styles = css`
    .game-start-overlay {
      position: absolute;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      visibility: hidden;
      color: white;
      text-align: center;
      font-family: Georgia, serif;
      font-size: 48px;
    }

    .game-start-overlay--visible {
      visibility: visible;
    }

    .game-start-overlay__new-game-button {
      display: block;
      font-size: 16px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding: 0 20px;
      box-sizing: border-box;
    }

  `;

  @property()
  visible:boolean = false;

  handleStartGameClick(e) {
    this.dispatchEvent(new Event('startnewgame', {bubbles: true}));
  }

  render() {
    return html`<div class="game-start-overlay ${this.visible !== false ? "game-start-overlay--visible" : ""}">
      <h1>Welcome to Camptanion!</h1>
      <button class="game-start-overlay__new-game-button" @click=${this.handleStartGameClick}>Start New Game</button>
    </div>`;
  }
}
