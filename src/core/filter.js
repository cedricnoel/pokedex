request.open('GET', 'https://pokeapi.co/api/v2/type', /* async = */ false);
request.send();

var response = JSON.parse(request.response);
var results = response.results;
var types = {};
var divTypes = document.getElementById('types');

for(i = 0; i < results.length; i++) {
    types[i] = {};
    types[i]['name'] = results[i].name;
}

typeSpan = document.createElement('span');
typeSpan.className = 'badge badge-secondary';
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
    typeSpan = document.createElement('span');
    typeSpan.className = 'badge badge-secondary';
    typeSpan.id = typeName;
    typeSpan.innerHTML = typeName;
    typeSpan.onclick = function()
    { 
        for(i = 0; i < pokemonsDiv.length; i++) {
            for(n = 0; n < pokemons[i].type.length; n++) {
                if (pokemons[i].type[n] != undefined && pokemons[i].type[0].type.name != this.id) {
                    pokemonsDiv[i].style.display = "none";
                }
                if (pokemons[i].type[n].type.name == this.id) {
                    pokemonsDiv[i].style.display = "block";
                }
            }
        }
    }
    divTypes.append(typeSpan);
}