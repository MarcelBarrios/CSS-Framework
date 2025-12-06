class NexusCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // I use ::slotted to style content passed in from the light DOM
        // I access the global CSS variables (tokens) directly
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--color-surface, #fff);
          border: 1px solid var(--color-border, #ccc);
          border-radius: var(--radius-lg, 0.5rem);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          font-family: var(--font-sans, sans-serif);
          color: var(--color-text, #000);
        }

        /* Header Slot Area */
        .card-header {
          padding: var(--space-md, 1rem);
          background-color: var(--color-secondary, #f0f0f0);
          border-bottom: 1px solid var(--color-border, #ccc);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: var(--space-sm, 0.5rem);
        }

        /* Hide header if no content is slotted */
        .card-header slot[name="header"]::slotted(*):empty {
          display: none;
        }

        /* Body (Default) Slot Area */
        .card-body {
          padding: var(--space-md, 1rem);
          line-height: 1.6;
        }

        /* Footer Slot Area */
        .card-footer {
          padding: var(--space-md, 1rem);
          border-top: 1px solid var(--color-border, #ccc);
          background-color: var(--color-bg, #fafafa);
          font-size: var(--text-sm, 0.875rem);
        }
      </style>

      <div class="card">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

        // Simple check to hide empty footer/header wrappers if desired
        // (Optional enhancement logic could go here)
    }
}

customElements.define('nexus-card', NexusCard);