import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("dice-overlay")
export class DiceOverlay extends LitElement {
  static styles = css`
    .dice-overlay {
      position: absolute;
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: hidden;
    }

    .dice-overlay__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6vw;
    }

    .dice-overlay__dice {
      height: 20vw;
      width: 20vw;
      font-size: 100px;
    }

    .dice-overlay__dice--yellow {
      background: yellow;
    }

    .dice-overlay__dice--red {
      background: red;
    }

    .dice-overlay--visible {
      visibility: visible;
    }
  `;

  @property()
  number:2|3|4|5|6|7|8|9|10|11|12 = 11;

  @property()
  visible:boolean = false;

  renderDice(number:2|3|4|5|6|7|8|9|10|11|12) {
    // const diceOne = Math.floor(number / 2);
    const dualRandomizer = Math.floor(Math.random() * 2);
    const tripleRandomizer = Math.floor(Math.random() * 3);
    let diceOne;
    switch(parseInt(number)) {
      case 3:
      case 4:
      case 5:
        diceOne = dualRandomizer == 0 ? 1 : 2;
        break;
      case 6:
      case 7:
        diceOne = tripleRandomizer == 0 ? 1 : tripleRandomizer == 1 ? 2 : 3;
        break;
      case 8:
        diceOne = tripleRandomizer == 0 ? 2 : tripleRandomizer == 1 ? 3 : 4;
        break;
      case 9:
        diceOne = tripleRandomizer == 0 ? 3 : tripleRandomizer == 1 ? 4 : 5;
        break;
      case 11:
        diceOne = dualRandomizer == 0 ? 5 : 6;
        break;
      default:
        diceOne = Math.floor(number / 2);
    }
    let diceTwo = number - diceOne;
    const finalRandomizer = Math.floor(Math.random() * 2);
    diceOne = finalRandomizer == 0 ? diceOne : diceTwo;
    diceTwo = number - diceOne;


    const diceOneColor = dualRandomizer == 0 ? 'yellow' : 'red';
    const diceTwoColor = diceOneColor == 'yellow' ? 'red' : 'yellow';
    return html`<dice-image color="${diceOneColor}" number="${diceOne}"></dice-image>
    <dice-image color="${diceTwoColor}" number="${diceTwo}"></dice-image>`;
  }

  render() {
    return html`<div
      class="dice-overlay ${this.visible !== false ? "dice-overlay--visible" : ""}"
      @click="${(e) => this.visible = false}">
      <div class="dice-overlay__wrap">
        ${this.renderDice(this.number)}
      </div>
    </div>`;
  }
}
