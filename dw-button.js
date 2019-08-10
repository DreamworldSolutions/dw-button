/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from 'lit-element';

// These are the mwc element needed by this element.
import { Button } from "@material/mwc-button"

class DWButton extends Button {
  static get styles() {
    return [
      Button.styles,
      css`
        :host(.small) .mdc-button  {
          height: 22px;
        }
        :host .mdc-button {
          --mdc-theme-primary: var(--primary-text-color);
        }
        :host(.primary) .mdc-button  {
          --mdc-theme-primary: var(--primary-color);
        }
        :host(.accent) .mdc-button  {
          --mdc-theme-primary: var(--accent-color);
        }
        :host([outlined]) .mdc-button {
          --mdc-theme-primary: var(--primary-text-color);
        }
        :host([outlined].primary) .mdc-button {
          --mdc-theme-primary: var(--primary-color);
        }
        :host([outlined].accent) .mdc-button {
          --mdc-theme-primary: var(--accent-color);
        }
        :host([outlined].accent) .mdc-button {
          --mdc-theme-primary: var(--accent-color);
        }
        :host([filled]) .mdc-button:not(:disabled) {
          --mdc-theme-primary: var(--dark-primary-text-color); 
          background-color: var(--primary-color);
        }
        :host([filled]) .mdc-button:not(:disabled) {
          --mdc-theme-primary: var(--dark-primary-text-color); 
          background-color: var(--primary-color);
        }
        :host([filled].primary) .mdc-button:not(:disabled) {
          --mdc-theme-primary: var(--dark-primary-text-color); 
          background-color: var(--primary-color);
        }
        :host([filled].accent) .mdc-button:not(:disabled) {
          --mdc-theme-primary: var(--dark-primary-text-color); 
          background-color: var(--accent-color);
        }
        `,
    ];
  }

  static get properties() {
    return {
      
      /**
       * When you want to filled this button set to `true`.
       */
      filled : {
        type: Boolean,
        reflect: true
      }
    }
  }

  constructor(){
    super();
    this.filled = false;
  }
}

window.customElements.define('dw-button', DWButton);