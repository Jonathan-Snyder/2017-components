/**
 * Created by ThatJoeMoore on 11/7/16.
 */

(function (template) {
    class ByuUserLogin extends HTMLElement {

        set loginUrl(value) {
            let link = this.shadowRoot.querySelector('.link');

            if (value) {
                this.setAttribute('login-url', value);
                if (link) {
                    link.setAttribute('href', value);
                }
            } else {
                this.removeAttribute('login-url');
                if (link) {
                    link.removeAttribute('href');
                }
            }
        }

        get loginUrl() {
            return this.getAttribute('login-url');
        }

        set logoutUrl(value) {
            let link = this.shadowRoot.querySelector('.link');

            if (value) {
                this.setAttribute('logout-url', value);
                if (link) {
                    link.setAttribute('href', value);
                }
            } else {
                this.removeAttribute('logout-url');
                if (link) {
                    link.removeAttribute('href');
                }
            }
        }

        get logoutUrl() {
            return this.getAttribute('login-url');
        }
        set myaccountUrl(value) {
            let link = this.shadowRoot.querySelector('.link');

            if (value) {
                this.setAttribute('myaccount-url', value);
                if (link) {
                    link.setAttribute('href', value);
                }
            } else {
                this.removeAttribute('myaccount-url');
                if (link) {
                    link.removeAttribute('href');
                }
            }
        }

        get myaccountUrl() {
            return this.getAttribute('myaccount-url');
        }

        constructor() {
            super();

            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
            //Hack to make sure that the proper login URL gets set in our template.
            this.loginUrl = this.loginUrl;
            this.myaccountUrl = this.myaccountUrl;
            this.logoutUrl = this.logoutUrl;
        }

        static get observedAttributes() {
            return ['login-url'];
        }

        attributeChangedCallback(attr, oldval, newval) {
            switch (attr) {
                case 'login-url':
                    this.loginUrl = newval;
                    break;
                case 'myaccount-url':
                    this.myaccountUrl = newval;
                    break;
                case 'logout-url':
                    this.logoutUrl = newval;
                    break;
            }
        }

        connectedCallback() {
            this._addSlotListeners();
            this._addAriaAttributes();

            // get attribute value from byu-header
            //const loggedInStatus =  get observedAttributes() {return ['loggedin']; }
            const header = this.shadowRoot.querySelector("#byu-header");
            //var loggedIn = header.getAttribute(loggedin);

            const username = this.shadowRoot.querySelector("#username");
            var usernameLink = username.assignedNodes().filter(function (element) {
                return element instanceof HTMLElement
            });
            usernameLink.style.color = "#003DA5";

            if(usernameLink !== null) {
                var loggedIn = true;
            } else {
                var loggedIn = false;
            }

            if (loggedIn) {
                //signIn.style.cueBefore = "byu-user-login/images/user-sign-in.svg";
                const logOut = this.shadowRoot.querySelector("#logout");
                var logOutLink = logOut.assignedNodes().filter(function (element) {
                    return element instanceof HTMLElement
                });
                logOutLink.style.float = "right";
                logOutLink.style.marginRight = "10px";

            } else {
                // get sign in
                const signIn = this.shadowRoot.querySelector("#login");
                var signInLink = signIn.assignedNodes().filter(function (element) {
                    return element instanceof HTMLElement
                });
            }
            // create First Row section with icon, my account, and sign out links
            var firstRow = document.createElement("div");
            firstRow.style.display = "flex";
            firstRow.style.justifyContent = "space-between";



            if(loggedIn) {
                // show account & sign out
                var icon = document.createElement("img");
                icon.source("byu-user-logout/images/user-sign-out.svg");
                firstRow.appendChild(icon);
                firstRow.appendChild(usernameLink);
                firstRow.appendChild(logOutLink);
            } else {
                //show sign in...
                var icon = document.createElement("img");
                icon.source("byu-user-logout/images/user-sign-out.svg");
                firstRow.appendChild(icon);
                firstRow.appendChild(signInLink);
            }

            // prepend this FirstRow to menu links
            //Example:  section.insertBefore( span, section.firstChild );
            this.shadowRoot.querySelector('#navbarMenu').assignedNodes[0].shadowRoot.querySelector('secondary-nav').insertBefore( firstRow, this.shadowRoot.querySelector('#navbarMenu').assignedNodes[0].shadowRoot.querySelector('secondary-nav').firstChild );


        }

        _addSlotListeners() {
            this._setUrlFromLightDom();
            const slot = this.shadowRoot.querySelector('#delegate');
            slot.addEventListener('slotchange', e => {
                this._setUrlFromLightDom();
            });
        }

        _addAriaAttributes() {
            this.setAttribute('role', 'button');
        }

        _setUrlFromLightDom() {
            let slot = this.shadowRoot.querySelector('#delegate');
            let nodes = slot.assignedNodes().filter(node => node instanceof HTMLAnchorElement);
            if (!nodes.length) {
                return;
            }
            let link = nodes[0];
            if (link.href) {
                console.log('setting login url from', link);
                this.loginUrl = link.href;
                this.myaccountUrl = link.href;
                this.logoutUrl = link.href;
            }
        }

    }

    window.customElements.define('byu-user-login', ByuUserLogin);
    window.ByuUserLogin = ByuUserLogin;

})(/* FUSE */);
