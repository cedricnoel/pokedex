/**
 * Router object
 */
function Router(root = '/')
{
    /**
     * @var {*}
     */
    this.routes = []
    /**
     * @var {string}
     */
    this.root = root

    this.location = window.location
    
    /**
     * Add a route
     * 
     * @param {string} route 
     * @param {string} method 
     * @param {string} name 
     */
    this.add = (re, handler) => {
        if(typeof re == 'function') {
            handler = re
            re = ''
        }
        this.routes.push({ re: this.root + re, handler: handler})

        return this
    }

    /**
     * Add a route with GET method
     * 
     * @param {string} route
     * @param {string} name 
     */
    this.get = (route, name) => {
        this.routes[name] = {
            'route': this.root + route,
            'method': 'GET'
        }

        return this
    }

    /**
     * Add a route with POST method
     * 
     * @param {string} route 
     * @param {string} name 
     */
    this.post = (route, name) => {
        this.routes[name] = {
            'route': this.root + route,
            'method': 'POST'
        }

        return this
    }

    /**
     * Parse given uri
     * 
     * @param {string} uri
     */
    this.parse = (uri) => {
        return uri.toString().replace(/\/$/, '').replace(/^\//, '')
    }

    this.getComponent = (component) => {
        let client = new XMLHttpRequest()

        client.open('GET', '../src/templates/' + component)
        client.onreadystatechange = () => {
            return client.responseText
        }
        client.send()
    }

    this.renderComponent = (component) => {
        document.getElementById('root').append(component)
    }

    this.dispatch = () => {
        if (this.getUri() == this.root) {
            e = document.createElement('p')
            e.innerText = 'Hello World!'

            document.getElementById('root').appendChild(e)
        }
    }

    this.getLocation = () => {
        console.log(this.location)

        return this.location
    }

    this.getUri = () => {
        console.log(this.location.pathname)

        return this.location.pathname
    }

    /**
     * Show routes in console
     */
    this.diaplayRoutes = () => {
        console.log(this.routes)

        return this.routes
    }
}

let router = new Router('/project/')

router.get('test/', 'test-route')
    .post('zob/', 'zob-route')
    .add('about/', () => {
        console.log('Page about !')
    });

router.diaplayRoutes()

c = router.getComponent('test.html')
console.log(c)
router.renderComponent(c)

router.dispatch()