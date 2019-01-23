/** @type {Router} */
const router = new Router();

// Router configuration
router.config({ mode: 'hash'});

// adding routes
router
    .add(/about/, function() {
        router.loadTemplate('about.html');
    })
    .add(/test/, function() {
        console.log('test');
    })
    .add(/products\/(.*)\/edit\/(.*)/, function() {
        console.log('products', arguments);
    })
    .add(/home/, function() {
        router.loadTemplate('index.html', {
            'message': 'Hello World!'
        });
    })
    .add(/pokemon\/(.*)/, function() {
        var promise = router.getPokemon(arguments[0]);

        promise.then((value) => {
            router.loadTemplate('pokemon-detail.html', {
                'pokemon': value
            });
        })
    })
    .check('/products/12/edit/22').listen();

// forwarding to home
router.navigate('/home');