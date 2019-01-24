
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
                M.toast({html: this.name + " has been added"})
                router.navigate('/my-team/');
            }else{
                error.innerHTML = this.name + " already exist !";
                console.log(this.name + " already exist !");
            }
    }
}

var team = new Team();
var teamFormSubmit = document.getElementById("teamFormSubmit");
var teamName = document.getElementById("teamName");

if(teamFormSubmit){
    teamFormSubmit.addEventListener("click", function(e){
       
        e.preventDefault();
        team.name = teamName.value;
        if(!team.name && (team.pokemons.length > 6 || team.pokemons.length < 6 )){
            error.innerHTML = "Invalid team composition";
        }else{
            team.addToLocalStorage();
        }
    });
}


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

      //Ecouter l'événement.
            document.addEventListener('route-change', function (e) { 
                if(document.getElementById("teams")){
    getTeamsFromLocalStorage();
}
             }, false);

   if(document.getElementById("teams")){
    getTeamsFromLocalStorage();
}

function getTeamsFromLocalStorage(){
    let root = document.getElementById("teams");
    let ul = document.createElement("ul");
    for (var a in localStorage) {
        if(a.indexOf("team-") > -1){
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.className += "col s12 item card";
            let h3 = document.createElement("h4");
            let team = JSON.parse(localStorage[a]);
            let delete_button = document.createElement("button");
            delete_button.innerHTML = "Supprimer";
            delete_button.className += "btn red";
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
           let hr = document.createElement("hr");
           div.append(hr);
           div.append(ul2);
           div.append(delete_button);
           li.append(div);
           ul.append(li);
        }
     }
     root.append(ul);
}