A button Webcomponent created through LitElement and mwc-button(https://www.webcomponents.org/element/@material/mwc-button)

## Install
```html
npm install @dreamworld/dw-button
```

## Usage
```html
import '@dreamworld/dw-button/dw-button.js';

<dw-button label="normal"></dw-button>
```

## [Demo](https://dreamworldsolutions.github.io/dw-checkbox/demo/index.html)

## Configs/Options
It supports all the properties of mwc-button. It support extra property
- filled

### Theme
To configure color of the button using css variable.

```css
dw-button {
--primary-text-color: grey;
--primary-color: blue;
--accent-color: #50cA00;
--dark-primary-text-color: white;
}

```

### Theme
Override DWButton class to create a custom button

```
class CustomButton extends DWButton {

static get styles() {
	return [
		DWButton.styles,
		css`
		.mdc-button {
		  border-radius: 5px;
		}`
	];
 }
}
customElements.define('custom-button', CustomButton);

<custom-button></custom-button>
```