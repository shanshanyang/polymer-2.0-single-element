require('../scss/vs-element.scss');

// Extend Polymer.Element base class
// 
class VsElement extends Polymer.Element {

  static get is() { return "vs-element"; }

  // V1 syntax
  // static get observedAttributes() {
  //   return ['selected']
  // }
  // set selected(value) {}

  // get selected() {}

  static get config() {
   return { 
      // need to explicitly declare property
      // You have a property that's declared implicitly (used in a binding or observer, but not in the properties object).
      // You rely on configuring that property from an attribute (not a data binding).
      properties: {
        foo: Boolean,
        bar: Boolean,
        baz: String
      },
      observers: ['_observeStuff(foo, bar)']
    }
  }

  // V1 spec forbids reading attributes, and accessing child or parent information from the DOM API from the constructor
  // Defer work until after the constructor completes using setTimeout or requestAnimationFrame.
  // Move work to a different callback,such as attached/connectedCallback or ready.
  // Use an observer, slotchange event listener, or mutation observer to react to runtime changes.
  constructor () {
    super();
  }
  // called every time the element is inserted into the DOM
  // useful for running setup code, such as fetching resources or rendering
  connectedCallback () {
    super.connectedCallback();
    console.log('connectedCallback');
    this._updateThemeColor();
    this._findTextNodes();
    // this.innerHTML = `<div> hi </div>`;
  }

  disconnectedCallback () {
    console.log("disconnectedCallback");
  }

  //   // [Legacy]: attached callback is deferred until after first render, when elements could measure themselves or children
  // attached () {
  //   console.log("attached");
    // register a one-time callback after the next render.
    // Polymer.RenderStatus.afterNextRender(this, function() {
    //   // measure something
    // });
  // }
  
  // Attributes must be explicitly registered to be observed.
  // an attribute was added, removed, updated, or replaced.
  // Also called for initial values when an element is created by the parser, or upgraded
  attributeChangedCallback (attrName, oldVal, newVal) {
    console.log("attributeChangedCallback", attrName, oldVal, newVal); 
  }
  // // [Polymer specific]: v2.0 guarantees that the initial light DOM distribution is complete before ready is called.
  // // one-time initialization, signals the creation of the element's shadow DOM.
  // // In the case of class-based elements, you need to call super.ready() before accessing the shadow tree.
  // // V1.x initial light DOM distribution is asynchronous, which means distribution occurs after observers are run and ready is called.

  // ready () {
  //   console.log("ready");
  //   // callback fires after initial distribution is complete
  //   // setTimeout(function() {
  //   //   this.$.slot.assignedNodes({flatten: true});
  //   // }.bind(this), 0);

  //   // use slotchange event listener to react to runtime changes to distribution
  //   // this._boundHandler = this._processLightChildren.bind(this);
  //   // setTimeout(this._processLightChildren);
  //   // this.$.slot.addEventListener('slotchange', this._processLightChildren);

  //   // In order to force distribution synchronously, call ShadyDOM.flush(). This can be useful for unit tests.
  // }

  _observeStuff (foo, bar) {
    // check for undefined
    console.log(foo, bar);
    if (! (foo === null || bar === null)) {
      // no hidden dependency
      var v = foo && bar;
      console.log(v)
    } else {
      // handle undefined case.
      console.log("handle undefined case");
    }
  }

  // Polymer 2.0 updateStyles syntax
  _updateThemeColor () {
    console.log('updateThemeColor to #9fa8a3 from JS');
    this.updateStyles({'--my-theme-color': '#9fa8a3'});
  }

  _findTextNodes () {
    // childNodes *might* be a NodeList
    // var nodes = Polymer.dom(this).childNodes;
    console.log( this.childNodes, this.shadowRoot);
    // return Array.prototype.filter.call(nodes,
    //     function(n) { return n.nodeType = Node.TEXT_NODE });
  }

  // _stampTemplate(template) {
  //   console.log(template);
  //   // returns DOM, you choose if it goes in shadow root or not
  //   // DOM can support declarative event listeners
  // }
};

// hostAttributes and listeners are removed from element metadata, use _ensureAttribute() for convenience.
// Example: set tab-index if it's not already set
  // _ensureAttribute('tab-index', 0);
// Polymer sugared utility API are removed. For example: this.fire('some-event') is replaced with platform API: dispatchEvent
  // this.dispatchEvent(new CustomEvent('some-event'), {bubbles: true});


// // Polymer 2.0: use native DOM APIs 
// // this.shadowRoot
// // Events: 
// // Polymer.dom(event).localTarget -> event.target; 
// // Polymer.dom(event).path -> event.composedPath(); 
// // Polymer.dom(event).rootTarget -> event.composedPath()[0]
// // For no shadowDOM v1 suppport browsers, Polymer 2.0 use shady DOM v1 polyfill, which patches native DOM API as necessary to be mostly equivalent to native shadow DOM.

// Register custom element definition using standard platform API
customElements.define(VsElement.is,  VsElement);
