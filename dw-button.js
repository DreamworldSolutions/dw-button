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

export class DwButton extends Button {
  static get styles() {
    return [
      Button.styles,
      css`
        /** normal button css start */
        :host(.secondary) .mdc-button  {
          --mdc-theme-primary: var(--mdc-theme-secondary);
        }
        :host(.error) .mdc-button  {
          --mdc-theme-primary: var(--mdc-theme-error);
        }
        :host([raised].secondary) .mdc-button--raised:not(:disabled) {
          --mdc-theme-primary:  var(--mdc-theme-surface);
          --mdc-theme-on-primary:  var(--mdc-theme-secondary);
        }
        :host([raised].error) .mdc-button--raised:not(:disabled) {
          --mdc-theme-primary:  var(--mdc-theme-surface);
          --mdc-theme-on-primary:  var(--mdc-theme-error);
        }
        :host([disabled]) .mdc-button:disabled  {
          color: var(--mdc-theme-text-disabled);
        }

        /** primary-text button  css start */
        :host(.text) .mdc-button  {
          --mdc-theme-primary: var(--mdc-theme-text-primary);
        }

        /** outline button  css start */
        :host([outlined]) .mdc-button--outlined:disabled  {
          --mdc-theme-primary: var(--mdc-theme-secondary);
        }
        :host([error]) .mdc-button--outlined:disabled  {
          --mdc-theme-primary: var(--mdc-theme-error);
        }
        :host([disabled][outlined]) .mdc-button--outlined:disabled  {
          border-color: var(--mdc-theme-text-disabled);
        }

        /** filled button start */
        :host([filled]) .mdc-button:not(:disabled){
          background-color: var(--mdc-theme-primary);
          color: var(--mdc-theme-on-primary); 
        }
        :host([filled].secondary) .mdc-button:not(:disabled) {
          background-color: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary); 
        }
        :host([filled][disabled]) .mdc-button:disabled {
          background-color: var( --dw-disabled-background-color, var(--mdc-theme-divider-on-light));
        }
        `
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

    /**
    * call blur method to fix ripple effect after button click.
    */
    this.addEventListener('click', () => { this.blur(); })
  }
}

//Previously export was like this, so this is kept for backward compatiblity. In next major version it can be removed.
export const DWButton = DwButton;

window.customElements.define('dw-button', DwButton);
