'use strict';

/**
 * Router class
 *
 * Used to manage routes
 */
class Router {

    /**
     * Create a Router
     *
     * @param {string} root Path to the application root
     */
    constructor(root = '/') {
        this.config = {
            'routes': [],
            'root': Router.toRegex(root),
            'documentRoot': 'root',
            'rootHandler': null,
        }
    }

    /**
     * Set router root
     *
     * @param {string}   path    Route path
     * @param {string}   id      Route name
     * @param {function} handler Function to execute on match
     *
     * @return {Router} Router
     */
    setRoot(path, id, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error("Wrong argument type");
        }

        this.config.root = path;
        this.config.documentRoot = id;
        this.config.rootHandler = handler;

        return this
    }

    /**
     * Add a route
     *
     * @param {string}   path    Route path
     * @param {function} handler Handler of the route
     *
     * @return {Router} Router
     */
    add(path, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error("Wrong argument type");
        }

        this.config.routes.push({
            'path': Router.toRegex(path),
            'handler': handler
        });

        return this;
    }

    /**
     * Get current Uri
     *
     * @returns {string}
     */
    static getUri() {
        return window.location.pathname
    }

    /**
     * Convert route path in Regex
     *
     * @param  {string} path Route path
     *
     * @return {RegExp} RegExp
     */
    static toRegex(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type");
        }

        return new RegExp(path.replace(/:([\w]+)/gm, '([^/]+)'), 'gm');
    }

    /**
     * Navigation is used by usr to navigate in the app
     *
     * @param {string} path  Path where to navigate
     * @param {string} title Title of the page
     *
     * @return {Router} Router object
     */
    navigate(path, title = "ma page") {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type");
        }

        history.pushState({
            foo: 'bar'
        }, title, this.config.root + path);

        this.dispatch();

        return this;
    }

    /**
     * Forward the user
     *
     * @param {string} path
     */
    static forward(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type");
        }

        window.location.href = window.location.href.replace(/#(.*)$/, '') + path;
    }

    /**
     * Run the router
     */
    dispatch() {
        let uri = Router.getUri();

        if (uri === this.config.root) {
            return this.config.rootHandler()
        }

        for (let i = 0; i < this.config.routes.length; i++) {
            let m = this.config.routes[i].path.exec(this.config.root + uri);

            if (m !== null) {
                let params = [];

                if (m.length <= 1) {
                    return this.config.routes[i].handler()
                }

                for (let j = 1; j < m.length; j++) {
                    params.push(m[j]);
                }

                return this.config.routes[i].handler(params);
            }
        }

        return false;
    }

    /**
     * Load specific template
     *
     * @param {string} path
     * @param {object} data
     */
    loadTemplate(path, data = {}) {
        var promise = new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject('nique');
                }
            };
            xhttp.open("GET", 'http://localhost:8888/project/src/views/' + path, true);
            xhttp.send();
        });

        promise.then((value) => {
            document.getElementById('root').innerHTML = '';
            document.getElementById('root').innerHTML = value;

            app = data;

            setTimeout(function () {
                interpolation.detect();
            })
        });
    }
}