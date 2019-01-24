var sort = {};
var divSort = document.getElementById('sort');

types[0] = {};

var spanSortAZ = document.createElement('span');
spanSortAZ.className = 'badge badge-secondary';
spanSortAZ.innerHTML = "A-Z";
spanSortAZ.onclick = function()
    { 
        for(i = 0; i < pokemonsDiv.length; i++) 
        {
            if (i > 0) {
                a = pokemonsDiv[i];
                b = pokemonsDiv[i - 1];
                pokemonsDiv.sort((a, b) => a.id.localeCompare(b.id))
            }
            divPokemons.append(pokemonsDiv[i]);
        }
    }
    
divSort.append(spanSortAZ);

var spanSortWeight = document.createElement('span');
spanSortWeight.className = 'badge badge-secondary';
spanSortWeight.innerHTML = "Weight";
spanSortWeight.onclick = function()
    { 
        for(i = 0; i < pokemonsDiv.length; i++) 
        {
            if (i > 0) {
                a = pokemonsDiv[i];
                b = pokemonsDiv[i - 1];
                pokemonsDiv.sort((a, b) => parseInt(a.getAttribute('data-weight')) - parseInt(b.getAttribute('data-weight')))
            }
            divPokemons.append(pokemonsDiv[i]);
        }
    }
divSort.append(spanSortWeight);

var spanPknId = document.createElement('span');
spanPknId.className = 'badge badge-secondary';
spanPknId.innerHTML = "Pkmn ID";
spanPknId.onclick = function()
    { 
        pokemonsDiv.sort(sortNumber);
        for(i = 0; i < pokemonsDiv.length; i++) 
        {
            if (i > 0) {
                a = pokemonsDiv[i];
                b = pokemonsDiv[i - 1];
                pokemonsDiv.sort((a, b) => a.getAttribute('data-pokemonId') - b.getAttribute('data-pokemonId'));
            }
            divPokemons.append(pokemonsDiv[i]);
        }
    }
divSort.append(spanPknId);

function sortNumber(a,b) {
    return a - b;
}