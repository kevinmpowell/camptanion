import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("roll-button")
export class RollButton extends LitElement {
  static styles = css`
    button {
      background: #fce7b0;
      border: none;
      border-radius: 35px;
      color: black;
      cursor: pointer;
      font-size: 32px;
      font-family: Georgia, serif;
      height: 70px;
      position: relative;
      width: 70px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .roll-button__counter {
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      font-size: 12px;
      font-family: Helvetica, sans-serif;
      height: 24px;
      width: 24px;
      color: white;
      background: #5f5f5f;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  // Declare reactive properties
  @property()
  number?: number = 12;

  @property()
  counter? = 0;

  @property()
  highlight? = false;

  increaseCounter = () => {
    this.counter++;
  };

  render() {
    return html`<button @click="${this.increaseCounter}">
      <span class="roll-button__number">
        ${this.number}
      </span>
      <span class="roll-button__counter">${this.counter}</span>
    </button>`;
  }
}
