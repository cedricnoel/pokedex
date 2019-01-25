buildTypes();
function buildTypes(){
    var request = new XMLHttpRequest();
request.open('GET', 'https://pokeapi.co/api/v2/type', /* async = */ false);
request.send();
var pokemonsDiv = document.querySelectorAll('div .pkmn');

var response = JSON.parse(request.response);
var results = response.results;
var types = {};
var divTypes = document.getElementById('types');
divTypes.innerHTML = "<p>Types</p>"
var colorTypes = [
    {'type' : 'normal', 'color': 'brown lighten-5', 'hexa' : '#efebe9'},
    {'type' : 'fighting', 'color': 'deep-orange accent-4', 'hexa' : '#dd2c00'},
    {'type' : 'flying', 'color': 'deep-purple accent-1', 'hexa' : '#b388ff'},
    {'type' : 'poison', 'color': 'deep-purple accent-3', 'hexa' : '#651fff'},
    {'type' : 'rock', 'color': 'brown lighten-1', 'hexa' : '#8d6e63'},
    {'type' : 'ground', 'color': 'brown lighten-1', 'hexa' : '#8d6e63'},
    {'type' : 'bug', 'color': 'lime', 'hexa' : '#cddc39'},
    {'type' : 'ghost', 'color': 'indigo lighten-2', 'hexa' : '#7986cb'},
    {'type' : 'steel', 'color': 'blue-grey lighten-2', 'hexa' : '#90a4ae'},
    {'type' : 'fire', 'color': 'orange', 'hexa' : '#ff9800'},
    {'type' : 'water', 'color': 'blue', 'hexa' : '#2196f3'},
    {'type' : 'grass', 'color': 'green', 'hexa' : '14caf50'},
    {'type' : 'eletric', 'color': 'yellow', 'hexa' : '#ffeb3b'},
    {'type' : 'psychic', 'color': 'purple accent-1', 'hexa' : '#9c27b0'},
    {'type' : 'ice', 'color': 'cyan lighten-4', 'hexa' : '#b2ebf2'},
    {'type' : 'dragon', 'color': 'indigo accent-4', 'hexa' : '#304ffe'},
    {'type' : 'dark', 'color': 'grey darken-4', 'hexa' : '#212121'},
    {'type' : 'fairy', 'color': 'pink accent-1', 'hexa' : '#ff80ab'},
    {'type' : 'unknown', 'color': 'deep-orange accent-4', 'hexa' : '#ffebee'},
    {'type' : 'shadow', 'color': 'black', 'hexa' : '#000000'},
];

for(i = 0; i < results.length; i++) {
    types[i] = {};
    types[i]['name'] = results[i].name;
    if (colorTypes[i] != undefined) {
        types[i]['color'] = colorTypes[i].color;
    }
}

typeSpan = document.createElement('p');
typeSpan.className = 'btn waves-effect waves-light';
typeSpan.innerHTML = 'All';
typeSpan.onclick = function()
{ 
    for(i = 0; i < pokemonsDiv.length; i++) {
        if (pokemonsDiv[i].style.display = "none") {
            pokemonsDiv[i].style.display = "block";
        }
    }
}
divTypes.append(typeSpan);

for(i = 0; i < 20; i++) {
    typeName = types[i].name;
    typeColor = "white";
    if (types[i].color != undefined) {
        typeColor = types[i].color;
    }
    typeSpan = document.createElement('span');
    typeSpan.className = 'btn waves-effect ' + typeColor + '';
    typeSpan.id = typeName;
    typeSpan.innerHTML = typeName;
    typeSpan.onclick = function()
    {
        for(i = 0; i < pokemonsDiv.length; i++) {
            for(n = 0; n < pokemons[i].type.length; n++) {
                if (pokemons[i].type[n] != undefined && pokemons[i].type[0].type.name != this.id) {
                    document.getElementById(pokemons[i].name).style.display = "none";
                }
                if (pokemons[i].type[n].type.name == this.id) {
                    document.getElementById(pokemons[i].name).style.display = "block";
                }
            }
        }
    }
    divTypes.append(typeSpan);
}
}

      document.addEventListener('route-change', function (e) { 
        console.log(e);
        if(document.getElementById("types")){
           buildTypes();
       }
   }, false);