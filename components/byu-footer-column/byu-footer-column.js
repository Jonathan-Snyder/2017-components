(function (template) {
    'use strict';

    class BYUFooterColumn extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = template;
        }

        connectedCallback() {}
    }

    window.customElements.define('byu-footer-column', BYUFooterColumn);
    window.BYUFooterColumn = BYUFooterColumn;

})(`<style>:host {
  padding: 0 15px; }

.header {
  width: 100%; }

.header ::slotted(*) {
  font-family: "Vitesse A", "Vitesse B", Georgia, serif !important;
  text-transform: uppercase !important;
  color: #002e5d !important;
  font-size: 20px !important;
  border-bottom: 1px solid #c5c5c5 !important;
  padding-bottom: 3px !important;
  white-space: nowrap !important;
  font-weight: 400 !important;
  width: 100%;
  display: inline-block; }

.content ::slotted(:not(byu-footer-action-button)) {
  font-family: "Gotham A", "Gotham B", Helvetica, sans-serif !important;
  font-size: 13px;
  font-weight: 400 !important;
  color: #767676 !important;
  line-height: 35px !important;
  position: relative;
  top: -11px; }

#defaultContent::slotted(a) {
  text-decoration: none !important;
  outline: none !important; }

#defaultContent::slotted(a:hover) {
  cursor: pointer;
  color: #002e5d !important; }
</style>

<h2 class="header">
    <slot name="header"></slot>
</h2>
<div class="content">
    <slot id="defaultContent"></slot>
</div>`);