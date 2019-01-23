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

pokemon.prototype.hello = function() {
    return "Hello i am the pokemon " + this.name;
};


var newPokemonForm = document.getElementsByName("newPokemon")[0];
var error = document.getElementById("error");
if(newPokemonForm){
    newPokemonForm.addEventListener("submit", function(e){
        var image = document.getElementById("image").files[0];
        storeImage(image, e.target.name)
            .then(function(res){
                console.log(res);
                var newPokemon = new pokemon(null, e.target.name.value,e.target.name.type, res);
                newPokemon.addPokemonToLocalStorage();
                e.preventDefault();
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

getPokemonsFromLocalStorage();
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


class Team{

    constructor(name){
        this.name = name;
        this.pokemons = [];
    }

    addPokemon(pokemon){
        this.pokemons.push(pokemon);
    }

    removePokemon(id){
        this.pokemons = this.pokemons.filter( function(value){
            return value.id != id;
        });
    }

    addToLocalStorage(){
        console.log(this);
            if(!localStorage.getItem("team-"+this.name)){
                localStorage.setItem("team-"+this.name, JSON.stringify(this));
                error.innerHTML = "";
                console.log(this.name + " has been added");
            }else{
                error.innerHTML = this.name + " already exist !";
                console.log(this.name + " already exist !");
            }
    }
}

var team = new Team();
var addTeamForm = document.getElementsByName("addTeam")[0];
if(addTeamForm){
    addTeamForm.addEventListener("submit", function(e){
        e.preventDefault();
        team.name = e.target.name.value;
        if(!team.name && (team.pokemons.length > 6 || team.pokemons.length < 6 )){
            error.innerHTML = "Invalid team composition";
        }else{
            team.addToLocalStorage();
        }
    });
};

function addPokemonToTeam(e){

    if(team.pokemons.length >= 6){
        return false;
    }

    var id = e.getAttribute("data-id");
    if(e.checked){
        var addPokemon = pokemons[id -1];
        team.addPokemon(addPokemon);
    }else{
        team.removePokemon(id);
    }
}

//getTeamsFromLocalStorage();
function getTeamsFromLocalStorage(){
    let root = document.getElementById("teams");
    let ul = document.createElement("ul");
    for (var a in localStorage) {
        if(a.indexOf("team-") > -1){
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.className += "row";
            let h3 = document.createElement("h3");
            let team = JSON.parse(localStorage[a]);
            let delete_button = document.createElement("button");
            delete_button.innerHTML = "Supprimer";
            delete_button.className += " btn btn-danger";
            delete_button.addEventListener("click", function(){
                if(localStorage.getItem("team-"+team.name)){
                    localStorage.removeItem("team-"+team.name);
                    location.reload();
                }
            })
            h3.append(team.name);
            let ul2 = document.createElement("ul");
            for(var p=0;p<team.pokemons.length;p++){
                let li2 = document.createElement("li");
                li2.className += "col-lg-2";
                let h5 = document.createElement("h5");  
                h5.append(team.pokemons[p].name);
                let image = document.createElement("img");
                image.src = team.pokemons[p].sprite_front_url;
                li2.append(h5);
                li2.append(image);
                ul2.append(li2);
            }
           div.append(h3);
           div.append(ul2);
           div.append(delete_button);
           li.append(div);
           ul.append(li);
        }
     }
     root.append(ul);
}