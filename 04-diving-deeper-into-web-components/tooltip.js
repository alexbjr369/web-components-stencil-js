class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipIcon;
    this._tooltipVisible;
    this._tooltipText = 'Some dummy tooltip text.';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }

        ::slotted(.highlight) {
          background-color: red;
        }

        :host(.important) {
          background-color: var(--color-primary, #ccc);
          position: relative;
        }

        :host-context(p) {
          font-weight: bold;
        }
      </style>

      <slot>Some default</slot>
      <span> (?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    );
    this._render();
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip);
