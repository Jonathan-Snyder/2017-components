(function (template) {
    'use strict';

    class BYUHeader extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
        }
        connectedCallback() {

            // add Action Links to dropdown menu
            const actions = this.shadowRoot.querySelector("#action-links");
            var actionLinks = actions.assignedNodes().filter(function (element) {
                return element instanceof HTMLElement
            });
            // if action links exist
            if(actionLinks.length > 0) {
                // create the action item links
                for (var i = 0; i < actionLinks.length; i++) {
                    var cln = actionLinks[i].cloneNode(true);
                    // need to add the class action-link to this item
                    cln.classList.add("action-link");
                    // need to go in and add these to the dropdown menu
                    // right now this is a copy from byu-menu:
                    //this.shadowRoot.querySelector('.secondary-nav').appendChild(cln);
                    this.shadowRoot.querySelector('#navbarMenu').assignedNodes[0].shadowRoot.querySelector('secondary-nav').appendChild(cln);
                }
            }
        }
        // might need to add something like, if they sign in and attribute changes, adjust etc...
        // but if goes to new page, i think attribute would be set & above fxn process just fine
        //attributeChangedCallback(attributeName, oldValue, newValue, namespace)
        //Called when an attribute is changed, appended, removed, or replaced on the element. Only called for observed attributes.
    }

    window.customElements.define('byu-header', BYUHeader);
    window.BYUHeader = BYUHeader;

})(/* FUSE */);