'use strict';

class Renderer
{
    constructor() {
        this.config = {
            'templateDir': 'templates/'
        }
    }

    /**
     *
     * @param {string} path
     * @param {object} data
     */
    loadTemplate(path, data = {}) {
        /** @type {!XMLHttpRequest} */
        let mxhr = new XMLHttpRequest;
    
        /**
         * @return {undefined}
         */
        mxhr.onreadystatechange = () => {
            if (mxhr.readyState === 4 && mxhr.status === 200) {
                document.getElementById("root").innerHTML = mxhr.responseText;
            }
        };
        mxhr.open("GET", '../src/views/' + path, true);
        mxhr.send();
    }
}