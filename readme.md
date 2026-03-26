# dw-button

A Material Design button Web Component that extends [`@material/mwc-button`](https://www.webcomponents.org/element/@material/mwc-button) with color variant support (`secondary`, `error`, `text`), a `filled` style, and pointer-aware focus management.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-button
```

Import the component module (ES module):

```javascript
import '@dreamworld/dw-button/dw-button.js';
```

> **Peer dependency:** `@material/mwc-button@0.27.0`. Ensure Material Web Components polyfills are loaded if targeting browsers without native Custom Elements support.

---

### Basic Usage

```html
<dw-button label="Submit"></dw-button>
```

---

### API Reference

#### Properties / Attributes

`dw-button` directly defines the following properties. All other attributes (`label`, `icon`, `outlined`, `raised`, `disabled`, etc.) are inherited from [`mwc-button`](https://www.webcomponents.org/element/@material/mwc-button) and behave identically.

| Name | Type | Default | Attribute | Reflected | Description |
|------|------|---------|-----------|-----------|-------------|
| `filled` | `Boolean` | `false` | `filled` | Yes | Renders the button with a filled background using the active theme color. |
| `_noFocusEffect` | `Boolean` | `false` | `no-focus-effect` | Yes | Suppresses the ripple focus ring. Set automatically on pointer interaction; cleared on `blur`. Can also be set manually to permanently disable the focus effect. |

**Key inherited attributes (from `mwc-button`):**

| Attribute | Type | Description |
|-----------|------|-------------|
| `label` | `String` | Button text label. |
| `icon` | `String` | Material icon name displayed before the label. |
| `outlined` | `Boolean` | Renders button with an outlined border style. |
| `raised` | `Boolean` | Renders button with elevation (box-shadow). Not compatible with `outlined`. |
| `disabled` | `Boolean` | Disables the button. |
| `trailingIcon` | `Boolean` | Places the icon after the label. |
| `dense` | `Boolean` | Reduces button height. |

> For the full `mwc-button` API see: https://www.webcomponents.org/element/@material/mwc-button

---

#### CSS Classes

Applied to the `<dw-button>` host element to change the color variant.

| Class | Effect |
|-------|--------|
| *(none)* | Primary color (`--mdc-theme-primary`). |
| `secondary` | Secondary color (`--mdc-theme-secondary`). |
| `error` | Error color (`--mdc-theme-error`). |
| `text` | Text color (`--mdc-theme-text-primary`). |

```html
<dw-button label="Cancel" class="secondary"></dw-button>
<dw-button label="Delete" class="error"></dw-button>
<dw-button label="Learn more" class="text"></dw-button>
```

---

#### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--dw-button-height` | `36px` | Controls the height of the button. |
| `--dw-disabled-background-color` | `var(--mdc-theme-divider-on-light)` | Background color of a `filled` button in its `disabled` state. |

The following MDC theme tokens are consumed by `dw-button` styles and should be set on an ancestor element or `:root`:

| Token | Used For |
|-------|----------|
| `--mdc-theme-primary` | Default button color. |
| `--mdc-theme-secondary` | `.secondary` variant color. |
| `--mdc-theme-error` | `.error` variant color. |
| `--mdc-theme-surface` | Background for raised secondary/error buttons. |
| `--mdc-theme-on-primary` | Text/icon color on primary filled button. |
| `--mdc-theme-on-secondary` | Text/icon color on secondary filled button. |
| `--mdc-theme-text-primary` | Text color for `.text` variant. |
| `--mdc-theme-text-disabled` | Text color when `disabled`. |
| `--mdc-ripple-focus-opacity` | Focus ripple opacity (set to `0` when `no-focus-effect` is active). |

---

#### Events

No custom events are defined by `dw-button`. Standard DOM events (`click`, `focus`, `blur`, etc.) bubble as expected from `mwc-button`.

---

#### Slots

Not determinable from provided source. (Slot support, if any, is inherited from `mwc-button` and not overridden here.)

---

### Style Variants

Combine attributes and classes to compose the desired button appearance:

```html
<!-- Default (text, primary color) -->
<dw-button label="Normal"></dw-button>

<!-- Outlined -->
<dw-button label="Outlined" outlined></dw-button>

<!-- Filled -->
<dw-button label="Filled" filled></dw-button>

<!-- Raised (elevated) -->
<dw-button label="Raised" raised></dw-button>

<!-- Filled + Raised -->
<dw-button label="Filled Raised" filled raised></dw-button>

<!-- Secondary color -->
<dw-button label="Secondary" class="secondary"></dw-button>
<dw-button label="Secondary Raised" raised class="secondary"></dw-button>

<!-- Error color -->
<dw-button label="Error" class="error"></dw-button>

<!-- Text color -->
<dw-button label="Text" class="text"></dw-button>

<!-- Disabled -->
<dw-button label="Disabled" disabled></dw-button>
<dw-button label="Disabled Filled" filled disabled></dw-button>
<dw-button label="Disabled Outlined" outlined disabled></dw-button>
```

---

### Theming Example

```css
/* Light theme */
.app {
  --mdc-theme-primary:   #6200EE;
  --mdc-theme-secondary: #018786;
  --mdc-theme-error:     #b00020;
  --mdc-theme-surface:   #ffffff;
  --mdc-theme-on-primary:   #ffffff;
  --mdc-theme-on-secondary: #ffffff;
  --mdc-theme-text-primary: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-disabled: rgba(0, 0, 0, 0.38);
  --dw-disabled-background-color: rgba(0, 0, 0, 0.12);
}

/* Override button height */
dw-button {
  --dw-button-height: 40px;
}
```

---

### Known Issues

- **Normal + Raised in Primary color** is not achievable. This is a limitation of the CSS Custom Property names used internally by `mwc-button`.

---

## 2. Developer Guide / Architecture

### Architecture Overview

**Pattern: Mixin / Class inheritance**

```
buttonFocus (mixin from @dreamworld/pwa-helpers)
    └── Button (@material/mwc-button — LitElement-based)
            └── DwButton (dw-button.js)
```

| Layer | Responsibility |
|-------|---------------|
| `Button` (`mwc-button`) | Core button rendering, MDC styles, `label`, `icon`, `outlined`, `raised`, `disabled` properties, slot support. |
| `buttonFocus` mixin | Injects focus-management behavior from `@dreamworld/pwa-helpers`. |
| `DwButton` | Adds `filled` property, color-variant CSS classes (`secondary`, `error`, `text`), and pointer-aware focus-effect suppression. |

**Focus management logic (`dw-button.js`):**

The component listens to two host events in `connectedCallback`:

- `pointerdown` → sets `no-focus-effect` attribute (`_noFocusEffect = true`), which sets `--mdc-ripple-focus-opacity: 0` via CSS, hiding the keyboard-style focus ring during mouse/touch interaction.
- `blur` → clears `_noFocusEffect`, restoring the focus ring for subsequent keyboard navigation.

Listeners are removed in `disconnectedCallback` to prevent memory leaks.

**Backward-compatibility export:**

```javascript
export const DWButton = DwButton; // legacy alias; may be removed in a future major version
```

**Module format:** ES module (`"type": "module"` in `package.json`). The entry point is `dw-button.js`.

**Custom element registration:**

```javascript
customElements.define('dw-button', DwButton);
```

### Running the Demo Locally

From the repository root (requires Node.js):

```bash
yarn start
```

