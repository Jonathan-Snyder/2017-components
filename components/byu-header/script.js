(function (template) {
    'use strict';

    class BYUHeader extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
        }
        connectedCallback() {
            // get attribute value from byu-header
            //const loggedInStatus =  get observedAttributes() {return ['loggedin']; }
            const header = this.shadowRoot.querySelector("#byu-header");
            var loggedIn = header.getAttribute(loggedin);
            if (loggedIn) {
                //signIn.style.cueBefore = "byu-user-login/images/user-sign-in.svg";
                const signOut = this.shadowRoot.querySelector("#sign-out");
                var signOutLink = signOut.assignedNodes().filter(function (element) {
                    return element instanceof HTMLElement
                });
                signOutLink.style.float = "right";
                signOutLink.style.marginRight = "10px";
                const username = this.shadowRoot.querySelector("#username");
                var usernameLink = username.assignedNodes().filter(function (element) {
                    return element instanceof HTMLElement
                });
                usernameLink.style.color = "#003DA5";

            } else {
                // get sign in
                const signIn = this.shadowRoot.querySelector("#sign-in");
                var signInLink = signIn.assignedNodes().filter(function (element) {
                    return element instanceof HTMLElement
                });
            }
            // create First Row section with icon, my account, and sign out links
            var firstRow = document.createElement("div");
            firstRow.style.display = "flex";
            firstRow.style.justifyContent = "space-between";

            // top left
            //var firstRowLeft = document.createElement("div");
            //firstRowLeft.style.display = "flex";
            //firstRowLeft.style.justifyContent = "flex-start";

            if(loggedIn) {
                // show account & sign out
                var icon = document.createElement("img");
                icon.source("byu-user-logout/images/user-sign-out.svg");
                firstRow.appendChild(icon);
                firstRow.appendChild(usernameLink);
                //firstRow.appendChild(firstRowLeft);
                firstRow.appendChild(signOutLink);
            } else {
                //show sign in...
                var icon = document.createElement("img");
                icon.source("byu-user-logout/images/user-sign-out.svg");
                firstRow.appendChild(icon);
                firstRow.appendChild(signInLink);
                //firstRow.appendChild(firstRowLeft);
            }

            // prepend this FirstRow to menu links
            //Example:  section.insertBefore( span, section.firstChild );
            this.shadowRoot.querySelector('#navbarMenu').assignedNodes[0].shadowRoot.querySelector('secondary-nav').insertBefore( firstRow, this.shadowRoot.querySelector('#navbarMenu').assignedNodes[0].shadowRoot.querySelector('secondary-nav').firstChild );


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