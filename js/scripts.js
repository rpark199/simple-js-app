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
    
// Create pokemon button list
function addListItem(pokemon) {
    let pokemonList=document.querySelector('.row');
    let divElement=document.createElement('div');
    pokemonAddList.appendChilld(divElement);
    divElement.classList.add('list-group-item', col-12, 'col-md-4', 'col-lg-4');
    divElement.id= pokemon.name;
    
    let button=document.createElement('button');
    button.innerText= pokemon.name;
    button.setAttribute('data-id', i++);
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    divElement.appendChild(button);
    button.classList.add('btn', 'btn-lg', 'btn-block', 'list-btn');
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

//Modal shows display of the pokemon details
let modalContainer =document.querySelector('#modal-container');
function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
        openModal(pokemon);
    });
}

function openModal(pokemon) {
    modalContainer.innerHTML ='';

    let modal =document.createElement('div');
    modal.classList.add('modal');

    let modalContent =document.createElement('div');
    modalContent.classList.add('modal-content');

    let closeButtonElement =document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement =document.createElement('h2');
    nameElement.innerText = pokemon.name;

    let heightElement =document.createElement('p');
    heightElement.innerText =`height: ${pokemon.height}m`;

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
    modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
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
