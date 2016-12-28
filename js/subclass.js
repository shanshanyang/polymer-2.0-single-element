import "./index.js"

// Subclass existing element
class vsElementSub extends vsElement {
  static get is() { return 'vs-element-sub'; }
  static get config() {  }
  constructor() {
    super();
  }
}

// Register custom element definition using standard platform API
customElements.define(vsElementSub.is, vsElementSub);