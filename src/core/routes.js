/** @type Router */
const router   = new Router();

router.setRoot('/project/public/', 'root', () => {
    router.loadTemplate('index.html', {
        'message': 'Hello world'
    });
}).add('about/', () => {
    router.loadTemplate('about.html', {
        'message': 'Hello world'
    });
}).add('products/:slug/:id', (e) => {
    let p1 = document.createElement("p");
    p1.innerText = 'Slug: ' + e[0];

    let p2 = document.createElement("p");
    p2.innerText = 'Id: ' + e[1];

    let b = document.createElement('button');
    b.innerText = 'Go to Home';
    b.onclick = () => {
        router.navigate('')
    };
    
    let root = document.getElementById('root');
    root.innerHTML = '';

    root.appendChild(p1);
    root.appendChild(p2);
    root.appendChild(b);
});

router.dispatch();