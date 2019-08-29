# dw-button

A button web component created using [`mwc-button`](https://www.webcomponents.org/element/@material/mwc-button)


## [Demo](https://dreamworldsolutions.github.io/dw-button/demo/index.html)

## Install
```html
npm install @dreamworld/dw-button
```

## Usage
```html
import '@dreamworld/dw-button/dw-button.js';

<dw-button label="OK"></dw-button>
```

### Colors
Button is rendered by default in Primary color. It can be rendered in secondary, error or text color too. For that 
add corresponding class (`secondary`, `error` and `text`) to the button. e.g.

```html
<dw-button label="OK" class="secondary"></dw-button>
```

> it's actually main reason for creating extension of `mwc-button`.

### Styles
- To show button in outlined style add `outlined` attribute.
- To show button in filled style, add `filled` attribute.
- Additionally `raised` attribute can be used to show elevated button. As `outlined` button will never be raised, this
doesn't work with `outlined` style. 


### Disable
Add `disabled` attribute to make a button disabled.

## Known Issues
- It's not possible to show **Normal + Raised** button in **Primary** color. It's due to the Custom CSS Property names
used by `mwc-button` element.