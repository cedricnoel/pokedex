var router = {
    config: {
        'routes': [],
        'root': '/',
        'documentRoot': 'root',
        'rootHandler': null,
    },

    add: (path, handler) => {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            return false
        }

        router.config.routes.push({path: router.toRegex(path), handler: handler})

        return router
    },

    getUri: () => {
        return window.location.pathname
    },

    setRoot: (path, id, handler) => {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            return false
        }

        router.config.root = window.location.origin + path
        router.config.documentRoot = id
        router.config.rootHandler = handler

        return router
    },

    toRegex: (path) => {
        if (typeof path !== 'string') {
            return false
        }

        regex = new RegExp(path.replace(/:([\w]+)/gm, '([^/]+)'), 'gm')

        return regex
    },

    forward: (path) => {
        if (typeof path !== 'string') {
            return false
        }

        window.location.href = window.location.href.replace(/#(.*)$/, '') + path
    },

    navigate: (path) => {
        if (typeof path !== 'string') {
            return false
        }

        history.pushState({foo: 'bar'}, "page 2", router.config.root + path);

        router.dispatch()

        return router;
    },

    dispatch: () => {
        let uri = router.getUri()

        console.log(router.config.root)

        if (window.location.href == router.config.root) {
            return router.config.rootHandler()
        }

        for (var i = 0; i < router.config.routes.length; i++) {
            let m = router.config.routes[i].path.exec( router.config.root + uri )

            if (m !== null) {
                let params = []

                if (m.length <= 1) {
                    return router.config.routes[i].handler()
                }

                for (var j = 1; j < m.length; j++) {
                    params.push(m[j])
                }

                return router.config.routes[i].handler(params)
            }
        }

        return false
    }
}