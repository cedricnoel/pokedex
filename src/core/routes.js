router.setRoot('/project/public/', 'root', () => {
    let p = document.createElement("p")
    p.innerText = 'Root wesh !'

    let b = document.createElement('button')
    b.innerText = 'Go to About'
    b.onclick = () => {
        router.navigate('about/')
    }

    let d = document.createElement('button')
    d.innerText = 'Go to Products'
    d.onclick = () => {
        router.navigate('products/test/12')
    }

    let root = document.getElementById('root')
    root.innerHTML = ''

    root.appendChild(p)
    root.appendChild(b)
    root.appendChild(d)
}).add('about/', () => {
    let p = document.createElement("p")
    p.innerText = 'About !'

    let b = document.createElement('button')
    b.innerText = 'Go to Home'
    b.onclick = () => {
        router.navigate('')
    }

    let root = document.getElementById('root')
    root.innerHTML = ''

    root.appendChild(p)
    root.appendChild(b)
}).add('products/:slug/:id', (e) => {
    let p1 = document.createElement("p")
    p1.innerText = 'Slug: ' + e[0]

    let p2 = document.createElement("p")
    p2.innerText = 'Id: ' + e[1]

    let b = document.createElement('button')
    b.innerText = 'Go to Home'
    b.onclick = () => {
        router.navigate('')
    }
    
    let root = document.getElementById('root')
    root.innerHTML = ''

    root.appendChild(p1)
    root.appendChild(p2)
    root.appendChild(b)
})

router.dispatch()