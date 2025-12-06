# Nexus Web Components
**Extension to the Nexus CSS Framework**

This project extends the static CSS framework with three custom Web Components. These components encapsulate structure and behavior while strictly adhering to the design tokens defined in `acsd.css` (via CSS variables).

## 1. Nexus Card (`<nexus-card>`)
**Type:** Visual / Static Component

The `<nexus-card>` solves the problem of repetitive markup for card layouts. Instead of a developer manually writing `div.card`, `div.card__header`, and `div.card__footer`, they simply use slots.

* **Framework Integration:** It consumes `--color-surface`, `--color-border`, and `--radius-lg` from the CSS framework to ensure it matches the visual identity perfectly.
* **Implementation:** It utilizes Shadow DOM to encapsulate styles and named slots (`header`, `footer`) to inject content into specific layout areas.
* **Future Improvements:** Add a `variant` attribute to support "elevated" vs "outlined" styles or "interactive" states.

## 2. Nexus Toggle (`<nexus-toggle>`)
**Type:** Interactive Component

The `<nexus-toggle>` provides a semantic, keyboard-accessible alternative to the standard checkbox for "On/Off" settings. It fits the "internal tools" use case of the framework.

* **Framework Integration:** Uses `--color-success` for the active state and `--color-border` for the inactive state. Focus rings use the framework's standard `--color-primary`.
* **Implementation:** It maintains internal state (`_checked`), handles `click` and `keydown` (Space/Enter) events for accessibility, and dispatches a custom `nexus-change` event that external scripts can listen to.
* **Future Improvements:** Implement `ElementInternals` to make it fully form-associated (so it submits inside a native `<form>` tag).

## 3. Nexus Toast (`<nexus-toast>`)
**Type:** Smart / Dynamic Component

The `<nexus-toast>` handles temporary feedback messages. It solves the complexity of managing timers and entrance/exit animations manually in JavaScript.

* **Framework Integration:** It dynamically sets its border color based on the `type` attribute (success, danger, info) by mapping to `--color-{type}` tokens.
* **Implementation:** It features a "smart" lifecycle: upon connecting to the DOM, it starts an internal timer based on the `duration` attribute. When the timer expires (or the close button is clicked), it performs an exit animation and removes itself from the DOM completely.
* **Future Improvements:** Create a `<nexus-toast-manager>` parent component to stack multiple toasts vertically so they don't overlap.