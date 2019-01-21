/** @type Router */
const router   = new Router();

router.setRoot('/project/public/', 'root', () => {
    router.loadTemplate('index.html', {
        'message': 'Hello world'
    });
}).add('about/', () => {
    router.loadTemplate('about.html');
}).add('products/:slug/:id', (e) => {
    router.loadTemplate('product.html', {
        'slug': e[0],
        'id': e[1],
    });
}).add('pokemon/:id', (e) => {
    var promise = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + e[0] + '/', false);
        req.send(null);

        if (req.status === 200) {
            resolve(JSON.parse(req.responseText));
        } else {
            reject('error');
        }
    });

    promise.then((value) => {
        router.loadTemplate('pokemon-detail.html', {
            'pokemon': value
        });
    })
});

router.dispatch();