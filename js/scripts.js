let pokemonRepository= (function(){
    let pokemonList = [];
    let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name'in pokemon
            ) {
                pokemonList.push(pokemon);
            } else{
                console.log('Pokemon is not correct')
        }
    }
    
    function getAll() {
        return pokemonList;
    }
    
    function filterByName(name){
        return pokemonList.filter(function(pokemon){
            return pokemon.name === name;
        });
    }
    
function addListItem(pokemon) {
    let pokemonList=document.querySelector('.pokemon-list');
    let li=document.createElement('li');
    pokemonList.appendChild(li);
    li.classList.add('pokemon-name-list');
    
    let button=document.createElement('button');
    button.innerText= pokemon.name;
    li.appendChild(button);
    
    button.classList.add('pokemon-name-button')
      addEventListenerToButton(button, pokemon); 
}

function addEventListenerToButton(button, pokemon) {
    button.addEventListener('click', function (e){
        showDetails(pokemon);
    });
}
    
function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
    });
}

function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
  }

function loadDetails(item) {
    let url= item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl= details.sprites.front_default;
        item.height= details.height;
        item.types= details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

return{
    add: add,
    getAll: getAll,
    filterByName: filterByName,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
};
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
