class NexusToggle extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._checked = false;
        this._disabled = false;
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
        this._updateState();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            this._checked = newValue !== null;
        } else if (name === 'disabled') {
            this._disabled = newValue !== null;
        }
        this._updateState();
    }

    setupEvents() {
        this.addEventListener('click', this._handleClick.bind(this));
        this.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                this._handleClick();
            }
        });
    }

    _handleClick() {
        if (this._disabled) return;

        this._checked = !this._checked;

        // Reflect attribute to DOM
        if (this._checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }

        // Dispatch Custom Event
        this.dispatchEvent(new CustomEvent('nexus-change', {
            bubbles: true,
            composed: true,
            detail: { checked: this._checked }
        }));
    }

    _updateState() {
        const switchEl = this.shadowRoot.querySelector('.switch');
        if (!switchEl) return;

        if (this._checked) {
            switchEl.classList.add('checked');
            this.setAttribute('aria-checked', 'true');
        } else {
            switchEl.classList.remove('checked');
            this.setAttribute('aria-checked', 'false');
        }

        if (this._disabled) {
            switchEl.classList.add('disabled');
            this.setAttribute('aria-disabled', 'true');
            this.removeAttribute('tabindex');
        } else {
            switchEl.classList.remove('disabled');
            this.setAttribute('aria-disabled', 'false');
            this.setAttribute('tabindex', '0');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm, 0.5rem);
          cursor: pointer;
          font-family: var(--font-sans, sans-serif);
          user-select: none;
        }

        :host(:focus) {
          outline: none;
        }

        :host(:focus-visible) .switch {
          box-shadow: 0 0 0 3px var(--color-primary, blue);
          border-color: var(--color-primary, blue);
        }

        .switch {
          position: relative;
          width: 3rem;
          height: 1.5rem;
          background-color: var(--color-border, #ccc);
          border-radius: var(--radius-full, 9999px);
          transition: background-color 0.2s, opacity 0.2s;
        }

        .switch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: calc(1.5rem - 4px);
          height: calc(1.5rem - 4px);
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .switch.checked {
          background-color: var(--color-success, green);
        }

        .switch.checked::after {
          transform: translateX(1.5rem);
        }

        .switch.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        :host([disabled]) {
          cursor: not-allowed;
        }
      </style>
      
      <div class="switch"></div>
      <slot></slot>
    `;
    }
}

customElements.define('nexus-toggle', NexusToggle);