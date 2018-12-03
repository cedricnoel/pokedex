class Router 
{
    constructor() {
        this.config = {
            'routes': [],
            'root': '/',
            'documentRoot': 'root',
            'rootHandler': null,
        }
    }

    setRoot(path, id, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error("Wrong argument type")
        }

        this.config.root = window.location.origin + path
        this.config.documentRoot = id
        this.config.rootHandler = handler

        return this
    }

    add(path, handler) {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            throw new Error("Wrong argument type")
        }

        this.config.routes.push({path: this.toRegex(path), handler: handler})

        return this
    }

    getUri() {
        return window.location.pathname
    }

    toRegex(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type")
        }

        let regex = new RegExp(path.replace(/:([\w]+)/gm, '([^/]+)'), 'gm')

        return regex
    }

    forward(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type")
        }

        window.location.href = window.location.href.replace(/#(.*)$/, '') + path
    }

    navigate(path) {
        if (typeof path !== 'string') {
            throw new Error("Wrong argument type")
        }

        history.pushState({foo: 'bar'}, "page 2", this.config.root + path);

        this.dispatch()

        return this;
    }

    dispatch() {
        let uri = this.getUri()

        if (window.location.href == this.config.root) {
            return this.config.rootHandler()
        }

        for (var i = 0; i < this.config.routes.length; i++) {
            let m = this.config.routes[i].path.exec( this.config.root + uri )

            if (m !== null) {
                let params = []

                if (m.length <= 1) {
                    return this.config.routes[i].handler()
                }

                for (var j = 1; j < m.length; j++) {
                    params.push(m[j])
                }

                return this.config.routes[i].handler(params)
            }
        }

        return false
    }
}