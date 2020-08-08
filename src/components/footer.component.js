class FooterComponent extends HTMLElement {

  constructor() {
    super();

    this.year = new Date().getFullYear();
    this.root = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <footer><span>&copy; ${this.year}</h1>
    `;
  }
}

customElements.define('app-footer', FooterComponent);