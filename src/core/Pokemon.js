class pokemon{

    constructor(id, name, type, image ){
        this.id = id;
        this.name = name;
        this.type = type;
        this.image = image;
    }
    
    addPokemonToLocalStorage(pokemon){
        if(!localStorage.getItem("pokemon-"+pokemon.name)){
            localStorage.setItem("pokemon-"+pokemon.name, JSON.stringify(pokemon));
            error.innerHTML = "";
            console.log(pokemon.name + " has been added");
        }else{
            
            error.innerHTML = pokemon.name + " already exist !";
            console.log(pokemon.name + " already exist !");
        }
    }

    removePokemonToLocalStorage(name){
        if(localStorage.getItem("pokemon-"+name)){
            localStorage.removeItem("pokemon-"+name);
        }
    }
}

var newPokemonForm = document.getElementsByName("newPokemon")[0];
var error = document.getElementById("error");

newPokemonForm.addEventListener("submit", function(e){
    var image = document.getElementById("image").files[0];
    var newPokemon = new pokemon(null, e.target.name.value,e.target.name.type,null);
    newPokemon.image = storeImage(image, newPokemon.name);
    pokemon.addPokemonToLocalStorage(newPokemon);
    e.preventDefault();
})

function storeImage(image, name){
    var imgUrl;
    var reader = new FileReader();  
    reader.onload = function(e) {
      var imgURL = reader.result;
      try {
        localStorage.setItem("pokemon-"+name+"-url", imgURL);
        return "pokemon-"+name+"-url";
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
      saveDataToLocalStorage(imgURL);
    }
    reader.readAsDataURL(image);
}