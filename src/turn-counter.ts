import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("turn-counter")
export class TurnCounter extends LitElement {
  static styles = css`
    .turn-counter {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .turn-counter__label-wrap {
      width: 120px;
    }
    .turn-counter__label {
      display: block;
    }

    .turn-counter__roll-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .turn-counter__undo-roll {
      display: block;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }
  `;

  @property()
  counter? = 0;

  increaseCounter = (e) => {
    if (e.target.nodeName === "ROLL-BUTTON") {
      this.counter++;
    }
  };

  handleUndoClick = (e) => {
    this.dispatchEvent(new Event("undoroll", { bubbles: true }));
  };

  render() {
    return html`<div class="turn-counter" @click="${this.increaseCounter}">
      <div class="turn-counter__label-wrap">
        <span class="turn-counter__label">Rolls</span>
        <span class="turn-counter__count">${this.counter}</span>
        <button class="turn-counter__undo-roll" @click=${this.handleUndoClick}>
          Undo Roll
        </button>
      </div>
      <div class="turn-counter__roll-buttons">
        <slot></slot>
      </div>
    </div>`;
  }
}
