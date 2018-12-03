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
     * @param {string}   path    [description]
     * @param {string}   id      [description]
     * @param {function} handler [description]
     *
     * @return {Router} Router
     */
    setRoot(path, id, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error("Wrong argument type");
        }

        this.config.root = window.location.origin + path;
        this.config.documentRoot = id;
        this.config.rootHandler = handler;

        return this
    }

    /**
     * Add a route
     *
     * @param {string} path    Route path
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

        return this
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
     * @param  {string} path - Path where to navigate
     *
     * @return {Router} Router object
     */
    navigate(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type");
        }

        history.pushState({foo: 'bar'}, "page 2", this.config.root + path);

        this.dispatch();

        return this;
    }

    /**
     * Forward the user
     *
     * @param {string} path [description]
     */
    static forward(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type");
        }

        window.location.href = window.location.href.replace(/#(.*)$/, '') + path
    }

    /**
     * Run the router
     */
    dispatch() {
        let uri = Router.getUri();

        if (window.location.href === this.config.root) {
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
                    params.push(m[j])
                }

                return this.config.routes[i].handler(params)
            }
        }

        return false
    }
}