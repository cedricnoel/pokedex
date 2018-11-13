function Router()
{
    this.config = {
        'location': window.location,
        'uri': window.location.pathname,
        'routes': [],
        'root': '/'
    }

    this.add = (path, handler) => {
        if (typeof path !== 'string' || typeof handler !== 'function') {
            return false
        }

        this.config.routes.push({path: this.toRegex(path), handler: handler})

        return this
    }

    this.toRegex = (path) => {
        if (typeof path !== 'string') {
            return false
        }

        regex = new RegExp(path.replace(/:([\w]+)/gm, '([^/]+)'), 'gm')

        return regex
    }

    this.dispatch = () => {
        if (this.config.uri == this.config.root) {
            console.log('root')

            return true
        }

        for (var i = 0; i < this.config.routes.length; i++) {
            let m = this.config.routes[i].path.exec( this.config.root + this.config.uri )

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

    this.logRoutes = () => {
        console.log(this.config.routes)

        return this
    }

    this.logConfig = () => {
        console.log(this.config)

        return this
    }
}

/**
let router = new Router()

router.add('about/', () => {
    console.log('about')
}).add('products/:slug/:id', (e) => {
    console.log('success !!', e)
    console.log('Slug: ' + e[0])
    console.log('Id: ' + e[1])
}).dispatch()

router.logRoutes().logConfig()
*/