    build();
    function build(){
        var request = new XMLHttpRequest();
        var loading = document.getElementById("pokemons-loading");
        loading.style.display = "block";
        request.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151', /* async = */ false);
        request.send();
        var response = JSON.parse(request.response);
        var results = response.results;
        pokemons = {};
        var divPokemons = document.getElementById('pokemons-content');
        var pokemonsDiv = [];
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
        {'type' : 'grass', 'color': 'green', 'hexa' : '#4caf50'},
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
         pokemons[i] = {};
         pokemons[i]['name'] = results[i].name;

         pokemon = request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + results[i].name +'/', false);
         request.send();
         pokemon = JSON.parse(request.response);
         pokemons[i]['id'] = pokemon.id;
         pokemons[i]['sprite_front_url'] = pokemon.sprites.front_default;
         pokemons[i]['sprite_back_url'] = pokemon.sprites.back_default;
         pokemons[i]['type'] = pokemon.types;
         if(i == results.length -1){
          loading.style.display = "none";
      }
      pokemons[i]['weight'] = pokemon.weight;
      pokemons[i]['id'] = pokemon.id;
  }

  for(i = 0; i < results.length; i++) {
    colorClass1 = 'yellow';
    colorHexa1 = '';
    colorClass2 = '';
    colorHexa2 = '';

    pokemon = pokemons[i];
    pokemonName = pokemon.name;
    pokemonFrontSprite = pokemon.sprite_front_url;
    pokemonBackSprite = pokemon.sprite_back_url;
    pokemonId = pokemon.id;
    pokemonWeight = pokemon.weight / 10;
    pokemonType1 = pokemon.type[0].type.name;
    pokemonType2 = "";

    for (c = 0; c < colorTypes.length; c++) {
        if (colorTypes[c].type == pokemonType1) {
            colorClass1 = colorTypes[c].color;
            colorHexa1 = colorTypes[c].hexa;
        }
    }

    pokemonType = '<span class="btn waves-effect ' + colorClass1 + '">' + pokemonType1 + '</span>';

    if (pokemons[i].type[1] != undefined)
    {
        pokemonType2 = pokemon.type[1].type.name;
        for (c = 0; c < colorTypes.length; c++) {
            if (colorTypes[c].type == pokemonType2) {
                colorClass2 = colorTypes[c].color;
                colorHexa2 = colorTypes[c].hexa;
            }
        }
        pokemonType = '<span class="btn waves-effect ' + colorClass1 + '">' + pokemonType1 + '</span>' + '<span class="btn waves-effect '+ colorClass2 +'">' + pokemonType2 + '</span>';
    }

    pokemonDiv = document.createElement('div');
    pokemonDiv.setAttribute('pokemon', pokemonName);
    pokemonDivInside = document.createElement('div');
    pokemonImg = document.createElement('img');
    pokemonBackImg = document.createElement('img');
    pokemonBackImg.src = pokemonBackSprite;
    pokemonImg.src = pokemonFrontSprite;
    pokemonDiv.className = "col s4 pkmn " + colorClass1 + " lighten-5 waves-effect white-text center-text";
    pokemonDiv.id = pokemonName;
    pokemonDiv.setAttribute('data-back', pokemonBackSprite);
    pokemonDiv.setAttribute('data-front', pokemonFrontSprite);
    pokemonDiv.setAttribute('data-pokemonId', pokemonId);
    pokemonDiv.setAttribute('data-weight', pokemonWeight);
    pokemonDiv.setAttribute('data-type1', pokemonType1);
    pokemonDiv.setAttribute('data-type2', pokemonType2);
    pokemonDiv.setAttribute('data-gradient1', colorHexa1);
    pokemonDiv.setAttribute('data-gradient2', colorHexa2);
    pokemonDivInside.append(pokemonImg);
    pokemonDivInside.innerHTML += '<p style="text-shadow: black 0px 0px 5px;">#'+ pokemonId + ' ' + pokemonName + '</p>';
    pokemonDivInside.innerHTML += '<p style="text-shadow: black 0px 0px 5px;">'+ pokemonWeight + 'kg</p>';
    pokemonDiv.append(pokemonDivInside);
    pokemonDiv.innerHTML += pokemonType;
    pokemonDiv.innerHTML += '<br>'; 
    /* Only for create team page */
    if(window.location.hash == '#/my-team/add'){
      pokemonDiv.innerHTML += '<label style="    text-shadow: #1d1d1d 1px 0px 5px;float: right;margin: 10px 0;color: #FFF;"><input type="checkbox" onClick="addPokemonToTeam(this)" data-id="' + pokemons[i].id +'" id="checkbox-' + pokemons[i].id + '"/><span>Ajouter</span></label>';
  }else{
    let acceder = document.createElement("button");
    pokemonDiv.innerHTML += '<button class="btn btn-details" onClick="redirectToDetails(' + pokemons[i].id +')">Détails <i class="material-icons">chevron_right</i></button>';
}
pokemonsDiv[i] = pokemonDiv;
divPokemons.append(pokemonDiv);
}
var allPokemon = document.querySelectorAll('div .pkmn');

for (d = 0; d < allPokemon.length; d++) {
  if (allPokemon[d].getAttribute('data-type2') != "") {
    gradient1 = allPokemon[d].getAttribute('data-gradient1');
    gradient2 = allPokemon[d].getAttribute('data-gradient2');
    allPokemon[d].style.background = "linear-gradient(45deg, " + gradient1 + " 50%, " + gradient2 + " 50%)";
}
}
}

      //Ecouter l'événement.
      document.addEventListener('route-change', function (e) { 
        if(document.getElementById("pokemons-content")){
           build();
       }
   }, false);

  function redirectToDetails(id){
   router.navigate('/pokemon/' + id);
}

function filter()
{
    let input = document.getElementById("pokemonName");
    let filter = input.value.toUpperCase();
    let elements = getAllElementsWithAttribute('pokemon');

    for (let i = 0; i < elements.length; i++) {
        pokemonName = elements[i].getAttribute('pokemon').toUpperCase();

        if (pokemonName.indexOf(filter) > -1) {
            elements[i].style.display = "";
        } else {
            elements[i].style.display = 'none';
        }
    }
}

function getAllElementsWithAttribute(attribute)
{
    let matchingElements = [];
    let allElements = document.getElementsByTagName('*');

    for (let i = 0, n = allElements.length; i < n; i++)
    {
        if (allElements[i].getAttribute(attribute) !== null)
        {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}
