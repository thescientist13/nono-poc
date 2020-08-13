class HeaderComponent extends HTMLElement {

  constructor() {
    super();

    this.projectName = 'NoNo POC Project';
    this.root = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <header>
        <h1>${this.projectName}</h1>
      </header>
    `;
  }
}

customElements.define('app-header', HeaderComponent);