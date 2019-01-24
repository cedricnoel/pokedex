class pokemon{

    constructor(name, type, image){
        this.name = name;
        this.type = type;
        this.image = image;
    }
    
    addPokemonToLocalStorage(){
        if(!localStorage.getItem("pokemon-"+this.name)){
            localStorage.setItem("pokemon-"+this.name, JSON.stringify(this));
            error.innerHTML = "";
            console.log(this.name + " has been added");
        }else{
            error.innerHTML = this.name + " already exist !";
            console.log(this.name + " already exist !");
        }
    }
}

       //Ecouter l'événement.
            document.addEventListener('route-change', function (e) { 
                if(document.getElementById("my-pokemons")){
    getPokemonsFromLocalStorage();
}
             }, false);


pokemon.prototype.hello = function() {
    return "Hello i am the pokemon " + this.name;
};


var error = document.getElementById("error");
var newPokemonForm = document.getElementsByName("newPokemon")[0];
var pokemonFormSubmit = document.getElementById("newPokemon-submit");

if(pokemonFormSubmit && newPokemonForm){
pokemonFormSubmit.addEventListener("click", function(e){
        e.preventDefault();
        var image = document.getElementById("image").files[0];
        storeImage(image, e.target.name)
            .then(function(res){
                var newPokemon = new pokemon(newPokemonForm.name.value, newPokemonForm.type.value, res);
                newPokemon.addPokemonToLocalStorage();
                newPokemonForm.reset();
            })
    })
}



function storeImage(image, name){
    return new Promise(function(resolve,reject){
        var imgUrl;
        var reader = new FileReader();  
        reader.onload = function(e) {
            var imgURL = reader.result;
            if(imgURL){
                resolve(imgURL);
            }else{
                reject("Echec");
            }
        }
        reader.readAsDataURL(image);
    })
}

if(document.getElementById("my-pokemons")){
    getPokemonsFromLocalStorage();
}

function getPokemonsFromLocalStorage(){
    var root = document.getElementById("my-pokemons");
    var ul = document.createElement("ul");
    for (var a in localStorage) {
        if(a.indexOf("pokemon") > -1){
            var li = document.createElement("li");
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            var p = document.createElement("p");
            var image = document.createElement("img");
            var pokemon = JSON.parse(localStorage[a]);
            var delete_button = document.createElement("button");
            delete_button.innerHTML = "Supprimer";
            delete_button.className += " btn btn-danger";
            delete_button.addEventListener("click", function(){
                if(localStorage.getItem("pokemon-"+pokemon.name)){
                    localStorage.removeItem("pokemon-"+pokemon.name);
                    location.reload();
                }
            })
            h4.innerHTML = pokemon.name;
            p.innerHTML = pokemon.type;
            image.src = pokemon.image;
            div.append(image);
            div.append(h4);
            div.append(p);
            div.append(delete_button);
            li.append(div);
            ul.append(li);
        }
     }
     root.append(ul);
}

