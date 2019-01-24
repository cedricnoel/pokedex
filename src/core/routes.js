/** @type {Router} */
const router = new Router();

// Router configuration
router.config({ mode: 'hash'});

// adding routes
router
    .add(/products\/(.*)\/edit\/(.*)/, function() {
        console.log('products', arguments);
    })
    .add(/home/, function() {
        router.loadTemplate('index.html', {
            'message': 'Hello to pokedex !'
        });
    })
    .add(/my-team\/add/, function() {
        router.loadTemplate('localStorage/newTeam.html');
    })
    .add(/my-team/, function() {
        router.loadTemplate('localStorage/teams.html');
    })
    .add(/my-pokemon\/add/, function(){
        router.loadTemplate('localStorage/newPokemon.html');        
    })
    .add(/my-pokemon/, function(){
        router.loadTemplate('localStorage/pokemons.html');        
    })
    .add(/pokemon\/(.*)/, function() {
        var promise = router.getPokemon(arguments[0]);

        promise.then((value) => {
            router.loadTemplate('pokemon-detail.html', {
                'pokemon': value
            });
        })
    })
    .add(/pokemons/, function() {
        router.loadTemplate('pokemons.html');
    })
    .check('/products/12/edit/22').listen();

// forwarding to home
router.navigate('/home/');