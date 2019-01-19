var request = new XMLHttpRequest();
request.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=10', /* async = */ false);
request.send();
var response = JSON.parse(request.response);
var results = response.results;
var pokemons = {};
var divPokemons = document.getElementById('pokemons');

for(i = 0; i < results.length; i++) {
   pokemons[i] = {};
   pokemons[i]['name'] = results[i].name;

   pokemon = request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + results[i].name +'/', false);
   request.send();
   pokemon = JSON.parse(request.response);

   pokemons[i]['sprite_front_url'] = pokemon.sprites.front_default;
   pokemons[i]['sprite_back_url'] = pokemon.sprites.back_default;
   pokemons[i]['type'] = pokemon.types;
}

for(i = 0; i < 151; i++) {
    pokemonName = pokemons[i].name;
    pokemonFrontSprite = pokemons[i].sprite_front_url;
    pokemonBackSprite = pokemons[i].sprite_back_url;
    pokemonType1 = pokemons[i].type[0].type.name;
    pokemonType = '<span class="badge">' + pokemonType1 + '</span>';
    pokemonType2 = undefined;
    onHover = 'onHover()';
    if (pokemons[i].type[1] != undefined)
    {
        pokemonType2 = pokemons[i].type[1].type.name;
        pokemonType = '<span class="badge">' + pokemonType1 + '</span>' + '<span class="badge">' + pokemonType2 + '</span>';
    }

    divPokemon = '<div class="col-md-2 pokemon" id="' + pokemonName + '" onmouseover="' + onHover + '" pokemon="' + pokemonName + '">'
    + '<p>#' + i + ' ' + pokemonName + '</p> ' 
    + '<p><img src="' + pokemonFrontSprite + '" alt="' + pokemonName + '"></p>'
    + '<span class="badge badge-secondary">' + pokemonType + '</span>'
    + '<hr>'
    + '</div>';

    divPokemons.innerHTML += divPokemon;
}