(function (template) { // limit scope

    class BYUMenu extends HTMLElement {

        static get observedAttributes() {
            return ['collapsed'];
        }

        get collapsed() {
            return this.hasAttribute('collapsed');
        }

        set collapsed(val) {
            if (val)
                this.setAttribute('collapsed', '');
            else
                this.removeAttribute('collapsed');
        }

        constructor() {
            super(); // always call super first
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }

        connectedCallback() {
            // if there are more than 6 links add the extras to a "more" dropdown
            const slot = this.shadowRoot.querySelector("#slot");

            var allLinks = slot.assignedNodes().filter(function (element) { return element instanceof HTMLElement });
            
            
            // create the secondary nav links
            for (var i = 0; i < allLinks.length; i++) {
                var cln = allLinks[i].cloneNode(true);
                this.shadowRoot.querySelector('.secondary-nav').appendChild(cln);
            }

            // calculate the height of the mobile dropdown
            var h = allLinks.length * 48;
            
            if (allLinks.length > 6) {

                // create the "extra links" dropdown
                var extraLinks = this.shadowRoot.querySelector('#extraLinks');
                extraLinks.style.display = "table-cell";

                allLinks = allLinks.slice(5);
                var dropdown = extraLinks.querySelector("#extraLinksDropdown")
                for (var i = 0; i < allLinks.length; i++) {
                    var listItem = document.createElement("li");
                    listItem.appendChild(allLinks[i]);
                    dropdown.appendChild(listItem);
                }

                // dynamically set the height of the extraLinksDropdown menu
                dropdown.style.height = (allLinks.length * 35) + "px;";
            }

            //dynamically set the height of the mobile dropdown based on the number of links
            var styleSheet = this.shadowRoot.querySelector("#stylePlaceHolder");
            styleSheet.innerHTML = "<style>.navbar-collapse { height: " + h + "px; }</style>";
        }
    }

    window.customElements.define('byu-menu', BYUMenu);
    window.BYUMenu = BYUMenu;

})(`<style>/*Variables*/
:host {
  display: block;
  width: 100%;
  height: auto;
  background: #ffffff;
  opacity: 0.88;
  border-bottom: 1px solid #ccc; }

:host([collapsed]) .navbar-collapse {
  height: 0; }

.outer-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-start;
  padding: 0; }

.inner-nav {
  width: 100%;
  display: table; }

.navbar-collapse {
  /* change height to be dynamic */
  padding: 0 15px;
  overflow: hidden;
  margin: 0 -15px;
  -webkit-box-shadow: 0px 2px 21px -4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 2px 21px -4px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 21px -4px rgba(0, 0, 0, 0.2);
  -webkit-transition-timing-function: ease;
  -o-transition-timing-function: ease;
  transition-timing-function: ease;
  -webkit-transition-duration: .35s;
  -o-transition-duration: .35s;
  transition-duration: .35s;
  -webkit-transition-property: height;
  -o-transition-property: height;
  transition-property: height; }

.secondary-nav {
  padding-left: 0;
  margin: 0 -15px; }

.secondary-nav > a {
  font-family: "Gotham A", "Gotham B", Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #002e5d;
  text-transform: uppercase;
  box-sizing: border-box;
  position: relative;
  display: block;
  padding: 18px 30px;
  line-height: 12px;
  text-decoration: none; }

.secondary-nav > a:hover {
  background-color: #f6f6f6;
  cursor: pointer; }

.extra-links, ::slotted(*) {
  display: table;
  width: 16.66%; }

.extra-links, ::slotted(*.selected) {
  background: #e6e6e6 !important; }

.extra-links, ::slotted(*) {
  font-family: "Gotham A", "Gotham B", Helvetica, sans-serif !important;
  font-size: 13px !important;
  font-weight: 400 !important;
  color: #002e5d !important;
  height: 35px !important;
  display: table-cell;
  text-transform: uppercase !important;
  text-decoration: none !important;
  vertical-align: middle !important;
  text-align: center !important; }

.extra-links:hover, ::slotted(*:hover) {
  background-color: #c5c5c5 !important; }

.extra-links {
  display: none;
  cursor: pointer; }
  .extra-links .extra-links-dropdown {
    display: none;
    position: absolute;
    background-color: #fff;
    z-index: 10;
    min-width: 16%;
    margin-top: 11px; }
    .extra-links .extra-links-dropdown ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      -webkit-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
      -webkit-transition-timing-function: ease;
      -o-transition-timing-function: ease;
      transition-timing-function: ease;
      -webkit-transition-duration: .35s;
      -o-transition-duration: .35s;
      transition-duration: .35s;
      -webkit-transition-property: height;
      -o-transition-property: height;
      transition-property: height; }
      .extra-links .extra-links-dropdown ul li {
        line-height: 35px; }
        .extra-links .extra-links-dropdown ul li .selected {
          background: #e6e6e6 !important;
          width: 100%;
          height: 100%;
          display: block; }
      .extra-links .extra-links-dropdown ul li:hover {
        background-color: #c5c5c5; }
  .extra-links:hover .extra-links-dropdown {
    display: block; }

#extraLinksDropdown a {
  text-decoration: none !important;
  color: #002e5d; }

@media (min-width: 1024px) {
  /* Hide any menu elements not in the first six. We'll use javascript to duplicate them and 
    stick them in a separate dropdown that gets hidden for mobile views */
  ::slotted(*:nth-child(n+7)) {
    display: none; } }

@media (max-width: 1023px) {
  nav.outer-nav {
    display: none; } }
</style>
<link type="text/css" rel="stylesheet" href="https://cloud.typography.com/75214/6517752/css/fonts.css" media="all" />
<nav class="outer-nav">
    <div class="inner-nav">
        <slot id="slot"></slot>
        <div class="extra-links" id="extraLinks">
            More
            <div class="extra-links-dropdown">
                <ul id="extraLinksDropdown"></ul>
            </div>
        </div>
    </div>
</nav>
<div class="navbar-collapse">
    <nav class="secondary-nav"></nav>
</div>
<div id="stylePlaceHolder"></div>`);