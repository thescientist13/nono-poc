import { LitElement, html } from 'lit-element';

class MyCounter extends LitElement {

  constructor() {
    super();

    this.count = 0;
  }

  static get properties() {
    return {
      count: {
        type: Number
      }
    };
  }

  increment() {
    console.log('increment!');
    this.count = this.count += 1;
  }

  decrement() {
    console.log('decrement!');
    this.count = this.count -= 1;
  }

  reset() {
    console.log('reset!!!!');
    this.count = 0;
  }

  render() {
    console.log('render', this.count);
    const { count } = this;

    return html`
      <div class="container">
        <h1>My Counter</h1>
        
        <p>The current count is: ${count}</p>
        
        <button @click="${this.increment}">+</button>
        <button @click="${this.decrement}">-</button>
        <button @click="${this.reset}">Reset</button>
      </div>
    `;
  }
}

customElements.define('my-counter', MyCounter);