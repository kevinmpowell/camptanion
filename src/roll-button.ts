import { LitElement, html, css, nothing, unsafeCSS } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from "lit/decorators.js";

const buttonSize = 70;
@customElement("roll-button")
export class RollButton extends LitElement {
  static styles = css`
    button {
      background: #fce7b0;
      border: none;
      border-radius: ${unsafeCSS(buttonSize/2)}px;
      color: black;
      cursor: pointer;
      font-size: 32px;
      font-family: Georgia, serif;
      height: ${unsafeCSS(buttonSize)}px;
      position: relative;
      width: ${unsafeCSS(buttonSize)}px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2px;
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

    .roll-button__number {
      display: block;
    }

    .roll-button--highlight {
      color: darkred;
    }

    .roll-button__frequency-indicator {
      display: flex;
      gap: 2px;
    }

    .roll-button__frequency-dot {
      height: ${unsafeCSS(buttonSize/15)}px;
      width: ${unsafeCSS(buttonSize/15)}px;
      border-radius: ${unsafeCSS(buttonSize/15/2)}px;
      background: black;
    }

    .roll-button--highlight .roll-button__frequency-dot {
      background: darkred;
    }
  `;

  // Declare reactive properties
  @property()
  number?: number = 12;

  @property()
  counter? = 0;

  @property()
  frequency?: number = 0;

  increaseCounter = () => {
    this.counter++;
  };

  render() {
    this.classes = { 'roll-button': true, 'roll-button--highlight': this.frequency >= 0.14};
    return html`<button @click="${this.increaseCounter}" class=${classMap(this.classes)}>
      <div class="roll-button__number">
        ${this.number}
      </div>
      <div class="roll-button__frequency-indicator">
        ${this.frequency >= 0.03 ? html`<span class="roll-button__frequency-dot"></span>` : nothing }
        ${this.frequency >= 0.06 ? html`<span class="roll-button__frequency-dot"></span>` : nothing }
        ${this.frequency >= 0.08 ? html`<span class="roll-button__frequency-dot"></span>` : nothing }
        ${this.frequency >= 0.11 ? html`<span class="roll-button__frequency-dot"></span>` : nothing }
        ${this.frequency >= 0.14 ? html`<span class="roll-button__frequency-dot"></span>` : nothing }
      </div>
      <span class="roll-button__counter">${this.counter}</span>
    </button>`;
  }
}
