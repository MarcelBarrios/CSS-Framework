class NexusToast extends HTMLElement {
    static get observedAttributes() {
        return ['duration', 'type'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._timer = null;
    }

    connectedCallback() {
        this.render();
        this._startTimer();

        // Add close button listener
        this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => {
            this.dismiss();
        });
    }

    disconnectedCallback() {
        if (this._timer) clearTimeout(this._timer);
    }

    _startTimer() {
        const duration = parseInt(this.getAttribute('duration') || '5000');
        if (duration > 0) {
            this._timer = setTimeout(() => {
                this.dismiss();
            }, duration);
        }
    }

    dismiss() {
        // Add exit class for animation
        const toast = this.shadowRoot.querySelector('.toast');
        toast.classList.add('hiding');

        // Wait for animation to finish before removing from DOM
        toast.addEventListener('transitionend', () => {
            this.remove(); // Removes the element from the light DOM
            this.dispatchEvent(new CustomEvent('nexus-toast-closed'));
        });
    }

    render() {
        const type = this.getAttribute('type') || 'info';
        // Mapping types to framework colors
        const colorVar = `var(--color-${type}, #333)`;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          bottom: var(--space-lg, 1.5rem);
          right: var(--space-lg, 1.5rem);
          z-index: 1000;
          font-family: var(--font-sans, sans-serif);
        }

        .toast {
          display: flex;
          align-items: center;
          gap: var(--space-md, 1rem);
          min-width: 300px;
          padding: var(--space-md, 1rem);
          
          background-color: var(--color-surface, white);
          color: var(--color-text, black);
          border-left: 5px solid ${colorVar};
          border-radius: var(--radius-md, 0.5rem);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        /* Animation State: Visible (called immediately after render via requestAnimationFrame usually, 
           but simplified here with animation keyframes or just default class logic) */
        .toast.showing {
          opacity: 1;
          transform: translateY(0);
        }

        .toast.hiding {
          opacity: 0;
          transform: translateY(-10px);
        }

        .content {
          flex: 1;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          color: var(--color-text-muted, #999);
          padding: 0;
          line-height: 1;
        }
        .close-btn:hover {
          color: var(--color-text, #000);
        }
      </style>

      <div class="toast">
        <div class="content">
          <slot></slot>
        </div>
        <button class="close-btn" aria-label="Close">&times;</button>
      </div>
    `;

        // Trigger entrance animation slightly after render
        requestAnimationFrame(() => {
            this.shadowRoot.querySelector('.toast').classList.add('showing');
        });
    }
}

customElements.define('nexus-toast', NexusToast);