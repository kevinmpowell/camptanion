import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("dice-image")
export class DiceImage extends LitElement {
  static styles = css`
    .dice-image {
      box-sizing: border-box;
      height: 20vw;
      width: 20vw;
      font-size: 100px;
      border-radius: 2vw;
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      padding: 0 2vh;
    }

    .dice-image__column {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      gap: 2vh;
      padding: 3vh 0;
      width: 33%;
    }

    .dice-image--4 .dice-image__column--first,
    .dice-image--4 .dice-image__column--last,
    .dice-image--6 .dice-image__column--first,
    .dice-image--5 .dice-image__column--first,
    .dice-image--6 .dice-image__column--last,
    .dice-image--5 .dice-image__column--last {
      justify-content: space-between;
    }

    .dice-image__column--middle {
      justify-content: center;
    }

    .dice-image__column--last {
      flex-direction: column-reverse;
    }

    .dice-image__dot {
      height: 4vw;
      width: 4vw;
      border-radius: 2vw;
      flex-shrink: 0;
      flex-grow: 0;
    }

    .dice-image--red {
      background: #C74824;
    }

    .dice-image--red .dice-image__dot {
      background: #EDD861;
    }

    .dice-image--yellow {
      background: #EDD861;
    }

    .dice-image--yellow .dice-image__dot {
      background: #C74824;
    }
  `;

  @property()
  color:"red" | "yellow" = "red";

  @property()
  number:1|2|3|4|5|6 = 2;

  renderNumberDots(number) {
    return html`
      <div class="dice-image__column dice-image__column--first">
        ${this.number >= 2 ? html`<div class="dice-image__dot"></div>` : nothing}
        ${this.number >= 4 ? html`<div class="dice-image__dot"></div>` : nothing}
        ${this.number == 6 ? html`<div class="dice-image__dot"></div>` : nothing}
      </div>
      <div class="dice-image__column dice-image__column--middle">
        ${this.number == 1 || this.number == 3 || this.number == 5 ? html`<div class="dice-image__dot"></div>` : nothing}
      </div>
      <div class="dice-image__column dice-image__column--last">
        ${this.number >= 2 ? html`<div class="dice-image__dot"></div>` : nothing}
        ${this.number >= 4 ? html`<div class="dice-image__dot"></div>` : nothing}
        ${this.number == 6 ? html`<div class="dice-image__dot"></div>` : nothing}
      </div>
    `
  }

  render() {
    return html`<div
      class="dice-image dice-image--${this.color} dice-image--${this.number}">
        ${this.renderNumberDots(this.number)}
    </div>`;
  }
}
