class pokemon{

    constructor(id, name, type, image ){
        this.id = id;
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

    removePokemonToLocalStorage(name){
        if(localStorage.getItem("pokemon-"+name)){
            localStorage.removeItem("pokemon-"+name);
        }
    }

    getPokemonsFromLocalStorage(){
        for (var a in localStorage) {
            console.log(a, ' = ', localStorage[a]);
         }
    }
}

var newPokemonForm = document.getElementsByName("newPokemon")[0];
var error = document.getElementById("error");

newPokemonForm.addEventListener("submit", function(e){
    var image = document.getElementById("image").files[0];
    storeImage(image, e.target.name)
        .then(function(res){
            var newPokemon = new pokemon(null, e.target.name.value,e.target.name.type, res);
            console.log(newPokemon);
            newPokemon.addPokemonToLocalStorage();
            e.preventDefault();
        })
})

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