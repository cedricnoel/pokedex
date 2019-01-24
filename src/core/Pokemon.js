class pokemon {

    constructor(name, type, image) {
        this.name = name;
        this.type = type;
        this.image = image;
    }

    addPokemonToLocalStorage() {
        if (!localStorage.getItem("pokemon-" + this.name)) {
            localStorage.setItem("pokemon-" + this.name, JSON.stringify(this));
            M.toast({html: this.name + " has been added"});
            console.log(this.name + " has been added");
            document.getElementsByName('name')[0].value = "";
            document.getElementsByName("type")[0].value = "";
            document.getElementById("image").files = null;
            document.getElementById("image").value = null;
            document.getElementById("file-path validate").value = null;
             console.log( document.getElementById("image").value);
             router.navigate('/my-pokemon/');
        } else {
            M.toast({html: this.name + " already exist !"});
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
    let count = 0;
    var ul = document.createElement("ul");
    for (var a in localStorage) {
        if (a.indexOf("pokemon") > -1) {
            count++;
            var li = document.createElement("li");

            var div = document.createElement("div");
            div.className += "card col s4";

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
            delete_button.className += " btn red";
            delete_button.addEventListener("click", function () {

                if (localStorage.getItem("pokemon-" + pokemon.name)) {
                    div.style.display = "none";
                    localStorage.removeItem("pokemon-" + pokemon.name);
                    M.toast({html: pokemon.name + " has been deleted"});
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
    if(count <= 0){
        let empty = document.createElement("li");
        let p = document.createElement("p");
        p.innerHTML = "Aucun pokemon";
        empty.append(p);
        ul.append(empty);
    }
    root.append(ul);
}

