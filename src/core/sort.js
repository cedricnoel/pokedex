var sort = {};
var divSort = document.getElementById('sort');
var divPokemons = document.getElementById('pokemons-content');
var pokemonsDiv = document.querySelectorAll('div .pkmn');
var pokemonsArray = Array.prototype.slice.call(pokemonsDiv, 0);

divSort.innerHTML = "<p>Sort</p>"

var spanSortAZ = document.createElement('span');
spanSortAZ.className = 'btn waves-effect waves-light';
spanSortAZ.innerHTML = "A-Z";
spanSortAZ.onclick = function()
    { 
        for(i = 0; i < pokemonsArray.length; i++) 
        {
            if (i > 0) {
                a = pokemonsArray[i];
                b = pokemonsArray[i - 1];
                pokemonsArray.sort((a, b) => a.id.localeCompare(b.id))
            }
            divPokemons.append(pokemonsArray[i]);
        }
    }
    
divSort.append(spanSortAZ);

var spanSortWeight = document.createElement('span');
spanSortWeight.className = 'btn waves-effect waves-light';
spanSortWeight.innerHTML = "Weight";
spanSortWeight.onclick = function()
    { 
        for(i = 0; i < pokemonsArray.length; i++) 
        {
            if (i > 0) {
                a = pokemonsArray[i];
                b = pokemonsArray[i - 1];
                pokemonsArray.sort((a, b) => parseInt(a.getAttribute('data-weight')) - parseInt(b.getAttribute('data-weight')))
            }
            divPokemons.append(pokemonsArray[i]);
        }
    }
divSort.append(spanSortWeight);

var spanPknId = document.createElement('span');
spanPknId.className = 'btn waves-effect waves-light';
spanPknId.innerHTML = "Pkmn ID";
spanPknId.onclick = function()
    { 
        for(i = 0; i < pokemonsArray.length; i++) 
        {
            if (i > 0) {
                a = pokemonsArray[i];
                b = pokemonsArray[i - 1];
                pokemonsArray.sort((a, b) => a.getAttribute('data-pokemonId') - b.getAttribute('data-pokemonId'));
            }
            divPokemons.append(pokemonsArray[i]);
        }
    }
divSort.append(spanPknId);