var request = new XMLHttpRequest();
request.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151', /* async = */ false);
request.send();
var response = JSON.parse(request.response);
var results = response.results;
var pokemons = {};
var divPokemons = document.getElementById('pokemons');
var pokemonsDiv = [];

for(i = 0; i < results.length; i++) {
   pokemons[i] = {};
   pokemons[i]['name'] = results[i].name;

   pokemon = request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + results[i].name +'/', false);
   request.send();
   pokemon = JSON.parse(request.response);
   pokemons[i]['id'] = pokemon.id;
   pokemons[i]['sprite_front_url'] = pokemon.sprites.front_default;
   pokemons[i]['sprite_back_url'] = pokemon.sprites.back_default;
   pokemons[i]['type'] = pokemon.types;
   pokemons[i]['weight'] = pokemon.weight;
   pokemons[i]['id'] = pokemon.id;
}

for(i = 0; i < results.length; i++) {
    pokemon = pokemons[i];
    pokemonName = pokemon.name;
    pokemonFrontSprite = pokemon.sprite_front_url;
    pokemonBackSprite = pokemon.sprite_back_url;
    pokemonId = pokemon.id;
    pokemonWeight = pokemon.weight / 10;
    pokemonType1 = pokemon.type[0].type.name;
    pokemonType = '<span class="badge badge-secondary">' + pokemonType1 + '</span>';
    pokemonType2 = undefined;

    if (pokemons[i].type[1] != undefined)
    {
        pokemonType2 = pokemon.type[1].type.name;
        pokemonType = '<span class="badge badge-secondary">' + pokemonType1 + '</span>' + '<span class="badge badge-secondary">' + pokemonType2 + '</span>';
    }

    pokemonDiv = document.createElement('div');
    pokemonImg = document.createElement('img');
    pokemonBackImg = document.createElement('img');
    pokemonBackImg.src = pokemonBackSprite;
    pokemonImg.src = pokemonFrontSprite;
    pokemonDiv.className = "col-md-3";
    pokemonDiv.id = pokemonName;
    pokemonDiv.setAttribute('data-back', pokemonBackSprite);
    pokemonDiv.setAttribute('data-front', pokemonFrontSprite);
    pokemonDiv.setAttribute('data-pokemonId', pokemonId);
    pokemonDiv.setAttribute('data-weight', pokemonWeight);
    pokemonDiv.append(pokemonImg);
    pokemonDiv.append(pokemonBackImg);
    pokemonDiv.innerHTML += '<p>#'+ pokemonId + ' ' + pokemonName + '</p>';
    pokemonDiv.innerHTML += '<p>'+ pokemonWeight + 'kg</p>';
    pokemonDiv.innerHTML += '<p>#'+ i + ' ' + pokemonName + '</p>';
    pokemonDiv.innerHTML += '<p><img src="' + pokemonFrontSprite + '" alt="' + pokemonName + '"></p>';
    pokemonDiv.innerHTML += pokemonType;addTeam
    /* Only for create team page */
    pokemonDiv.innerHTML += '<label for=""></label><input type="checkbox" onClick="addPokemonToTeam(this)" data-id="' + pokemons[i].id +'" id="checkbox-' + pokemons[i].id + '" class="add-team-checkbox"/>';
    pokemonDiv.innerHTML += pokemonType;
    pokemonDiv.innerHTML += '<hr>';
    pokemonsDiv[i] = pokemonDiv;
    
    divPokemons.append(pokemonDiv);
}
