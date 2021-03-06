/**
 * Router class
 */
class Router {

    /**
     * Router constructor
     */
    constructor() {
        this.routes = [];
        this.mode = null;
        this.root = '/pokedex/public/';
        this.templateDir = 'pokedex/src/views/';
    }

    /**
     * Router config function
     *
     * @param {Object} options
     *
     * @returns {Router}
     */
    config(options) {
        this.mode = options && options.mode && options.mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + Router.clearSlashes(options.root) + '/' : '/';

        return this;
    }

    /**
     * Get fragments
     *
     * @returns {*}
     */
    getFragment() {
        var fragment = '';
        if (this.mode === 'history') {
            fragment = Router.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }

        return Router.clearSlashes(fragment);
    }

    /**
     * Clear slashes
     *
     * @param {string} path
     *
     * @returns {string}
     */
    static clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    add(re, handler) {
        if (typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({re: re, handler: handler});

        return this;
    }

    remove(param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }

        return this;
    }

    flush() {
        this.routes = [];
        this.mode = null;
        this.root = '/';

        return this;
    }

    check(f) {
        var fragment = f || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }

        return this;
    }

    listen() {
        var self = this;
        var current = self.getFragment();
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);

        return this;
    }

    navigate(path) {
        path = path ? path : '';
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }

    loadTemplate(path, data = {}) {
        var promise = new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject('error');
                }
            };
            
            xhttp.open("GET", 'http://' + window.location.host + '/' + this.templateDir + path, true);
            xhttp.send();
        });

        promise.then((value) => {

            document.getElementById('root').innerHTML = '';
            document.getElementById('root').innerHTML = value;

            if (data.pokemon) {
                app = data.pokemon;
            } else {
                app = data;
            }

             var scripts = Array.prototype.slice.call( document.getElementById('root').getElementsByTagName("script"));
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src != "") {
                    var tag = document.createElement("script");
                    tag.src = scripts[i].src;

                    var all_scripts = Array.prototype.slice.call( document.getElementById('scripts').getElementsByTagName("script"));
                    var script_to_add = true;
                    for(var i=0; i<all_scripts.length;i++){
                        if(all_scripts[i].src === tag.src){
                            script_to_add = false;
                        }
                    }
                    if(script_to_add){
                        document.getElementById('scripts').appendChild(tag);
                    }
                }
                else {
                    eval(scripts[i].innerHTML);
                }
            }

            var event = new CustomEvent('route-change', {'detail': path});
            document.dispatchEvent(event);

            setTimeout(function () {
                interpolation.detect();
            })
        });
    }

    getPokemon(id) {
        var promise = new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + id + '/', false);
            req.send(null);

            if (req.status === 200) {
                resolve(JSON.parse(req.responseText));
            } else {
                reject('error');
            }
        });

        return promise;
    }
}
