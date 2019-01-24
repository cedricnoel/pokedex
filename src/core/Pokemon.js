class pokemon {

    constructor(name, type, image) {
        this.name = name;
        this.type = type;
        this.image = image;
    }

    addPokemonToLocalStorage() {
        if (!localStorage.getItem("pokemon-" + this.name)) {
            localStorage.setItem("pokemon-" + this.name, JSON.stringify(this));
            error.innerHTML = "";
            console.log(this.name + " has been added");
        } else {
            error.innerHTML = this.name + " already exist !";
            console.log(this.name + " already exist !");
        }
    }
}

//Ecouter l'événement.
document.addEventListener('route-change', function (e) {
    if (document.getElementById("my-pokemons")) {
        getPokemonsFromLocalStorage();
    }
}, false);


pokemon.prototype.hello = function () {
    return "Hello i am the pokemon " + this.name;
};

/**
 * Store custom pokemon in Local Store
 */
function storePokemon()
{
    /** @type {File} */
    let image = document.getElementById("image").files[0];
    /** @type {string} */
    let pokemonName = document.getElementsByName('name')[0].value;
    /** @type {string} */
    let pokemonType = document.getElementsByName("type")[0].value;

    storeImage(image, pokemonName)
        .then(function (res) {
            /** @type {pokemon} */
            let newPokemon = new pokemon(
                pokemonName,
                pokemonType,
                res
            );
            // Store pokemon
            newPokemon.addPokemonToLocalStorage();
        })
}

function storeImage(image, name) {
    return new Promise(function (resolve, reject) {
        var imgUrl;
        var reader = new FileReader();
        reader.onload = function (e) {
            var imgURL = reader.result;
            if (imgURL) {
                resolve(imgURL);
            } else {
                reject("Echec");
            }
        }
        reader.readAsDataURL(image);
    })
}

if (document.getElementById("my-pokemons")) {
    getPokemonsFromLocalStorage();
}

function getPokemonsFromLocalStorage() {
    var root = document.getElementById("my-pokemons");
    var ul = document.createElement("ul");
    for (var a in localStorage) {
        if (a.indexOf("pokemon") > -1) {
            var li = document.createElement("li");

            var div = document.createElement("div");
            div.classList.add('card');

            var divCardImage = document.createElement("div");
            divCardImage.classList.add('card-image');

            var span = document.createElement("span");
            span.classList.add('card-title');

            var divCardContent = document.createElement("div");
            divCardContent.classList.add('card-content');

            var divCardAction = document.createElement("div");
            divCardAction.classList.add('card-action');

            var p = document.createElement("p");
            var image = document.createElement("img");
            var pokemon = JSON.parse(localStorage[a]);
            var delete_button = document.createElement("a");

            delete_button.innerHTML = "Supprimer";
            //delete_button.className += " btn btn-danger";
            delete_button.addEventListener("click", function () {
                if (localStorage.getItem("pokemon-" + pokemon.name)) {
                    localStorage.removeItem("pokemon-" + pokemon.name);
                    location.reload();
                }
            });

            span.innerHTML = pokemon.name;
            p.innerHTML = pokemon.type;
            image.src = pokemon.image;

            div.append(divCardImage);
            divCardImage.append(image);
            divCardImage.append(span);

            div.append(divCardContent);
            divCardContent.append(p);

            div.append(divCardAction);
            delete_button.href = '#';
            divCardAction.append(delete_button);

            //div.append(delete_button);
            li.append(div);
            ul.append(li);
        }
    }
    root.append(ul);
}

