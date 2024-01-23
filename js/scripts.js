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
    
//Modal shows display of the pokemon details
function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        openModal(pokemon);
    });
}

function openModal(pokemon) {
    modalContainer.innerHTML ='';

    let modal =document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement =document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement =document.createElement('h2');
    nameElement.innerText = pokemon.name;

    let heightElement =document.createElement('p');
    heightElement.innerText =`height: ${pokemo.height}m`;

    let imageElement =document.createElement('img');
    imageElement.src =pokemon.imageUrl;
    imageElement.alt =pokemon.name;

    modalContent.appendChild(closeButtonElement);
    modalContent.appendChild(nameElement);
    modalContent.appendChild(heightElement);
    modalContent.appendChild(imageElement);

    modal.appendChild(modalContent);

    modalContainer.appendChild(modal);

modalContainer.classList.add('is-visible');
}

function hideModal() {
    let modalContainer =document.querySelector('modal-container');
    modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    let modalContainer =document.querySelector('modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

modalContainer.addEventListener('click', (e) => {
    let target =e.target;
    if (target === modalContainer) {
        hideModal();
    }
});

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
