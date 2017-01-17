(function (template) {
    'use strict';

    class BYUFooterActionButton extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = template;
        }

        connectedCallback() {}
    }

    window.customElements.define('byu-footer-action-button', BYUFooterActionButton);
    window.BYUFooterActionButton = BYUFooterActionButton;

})(`<style>:host {
  background-color: #767676;
  font-family: "Vitesse A", "Vitesse B", Georgia, serif;
  font-size: 20px !important;
  color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 2.2em;
  height: 45px;
  width: auto;
  min-width: 125px;
  margin: 10px 0 20px 0;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35); }

::slotted(*) {
  font-family: "Vitesse A", "Vitesse B", Georgia, serif !important;
  font-weight: 400 !important;
  color: #fff !important;
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0 20px;
  left: -20px;
  cursor: pointer;
  vertical-align: middle !important; }

::slotted(a) {
  text-decoration: none !important; }
</style>
<slot name="actiontext"></slot>`);