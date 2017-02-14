/**
 * Created by ThatJoeMoore on 11/7/16.
 */

(function (template) {
    class ByuUserLogout extends HTMLElement {

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
            return this.getAttribute('logout-url');
        }

        constructor() {
            super();

            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
            //Hack to make sure that the proper logout URL gets set in our template.
            this.logoutUrl = this.logoutUrl;
        }

        static get observedAttributes() {
            return ['logout-url'];
        }

        attributeChangedCallback(attr, oldval, newval) {
            switch (attr) {
                case 'logout-url':
                    this.logoutUrl = newval;
                    break;
            }
        }

        connectedCallback() {
            this._addSlotListeners();
            this._addAriaAttributes();
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
                console.log('setting logout url from', link);
                this.logoutUrl = link.href;
            }
        }

    }

    window.customElements.define('byu-user-logout', ByuUserLogout);
    window.ByuUserLogout = ByuUserLogout;

})(/* FUSE */);
