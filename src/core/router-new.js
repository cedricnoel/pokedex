var router = {
    'config': {
        'location': window.location,
        'uri': window.location.pathname,
        'routes': [],
        'root': '/'
    },

    'add': (path, handler) => {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            return false
        }

        router.config.routes.push({path: router.toRegex(path), handler: handler})

        return router
    },

    'toRegex': (path) => {
        if (typeof path !== 'string') {
            return false
        }

        regex = new RegExp(path.replace(/:([\w]+)/gm, '([^/]+)'), 'gm')

        return regex
    },

    'dispatch': () => {
        if (router.config.uri == router.config.root) {
            console.log('root')

            return true
        }

        for (var i = 0; i < router.config.routes.length; i++) {
            let m = router.config.routes[i].path.exec( router.config.root + router.config.uri )

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