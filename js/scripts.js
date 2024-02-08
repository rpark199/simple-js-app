let pokemonRepository = (function() {
    let pokemonList = []
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function filterByName(name) {
        let containerElement = document.querySelector('.row');
        let pokemonNames = pokemonList.map(item => item.name);

        pokemonNames.forEach((element) => {
            let containerChild = document.querySelector(`[id=${element}]`);
            if (containerChild) {
                if (!element.match(name)) {
                    containerElement.removeChild(containerChild);
                }
            }
        });
    }
    
    // Create pokemon button list
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group');
        let li = document.createElement('li');
        li.classList.add('list-group-item')
        pokemonList.appendChild(li);
    
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        li.appendChild(button);
        button.classList.add('btn', 'btn-success');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');
        addEventListenerToButton(button, pokemon)
    }
    
    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function() {
          showDetails(pokemon);
        })
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
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Modal shows display of the pokemon details
    let modal = document.querySelector('.modal');

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item)
        })
    }

    function showModal(pokemon) {
        let modalContent = document.querySelector('.modal-content');
        let modalBody = document.querySelector('.modal-body');
        let modalTitle = document.querySelector('.modal-title');
        let modalHeader = document.querySelector('.modal-header');
        let modalFooter = document.querySelector('.modal-footer');
        modalTitle.innerHTML = '';
        modalBody.innerHTML = '';
    
        let nameElement = document.createElement('h1');
        var capitalizedName = pokemon.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        nameElement.innerHTML = 'Name: ' + capitalizedName;
    
        let closeButtonElement = document.querySelector('.close');
    
        let imageFront = document.createElement('img');
        imageFront.classList.add('modal-img');
        imageFront.src = pokemon.imageUrlFront;
        imageFront.alt = 'Front image of ' + pokemon.name;
    
        let imageBack = document.createElement('img');
        imageBack.classList.add('modal-img');
        imageBack.src = pokemon.imageUrlBack;
        imageBack.alt = 'Back image of ' + pokemon.name;
    
        let typesElement = document.createElement('p');
        let types = [pokemon.types[0].type.name];
        for (let i = 1; i < pokemon.types.length; i++) {
          types.push(', ' + pokemon.types[i].type.name);
        }
        typesElement.innerHTML = 'Types: ' + types.join('');
    
        let heightElement = document.createElement('p');
        heightElement.innerHTML = 'Height: ' + pokemon.height;
    
        let weigthElement = document.createElement('p');
        weigthElement.innerHTML = 'Weigth: ' + pokemon.weight;
    
        let abilities = document.createElement('p');
        let abilitiesList = [pokemon.abilities[0].ability.name];
        for (let i = 1; i < pokemon.abilities.length; i++) {
          abilitiesList.push(', ' + pokemon.abilities[i].ability.name);
        }
        abilities.innerHTML = 'Abilities: ' + abilitiesList.join('');
    
        modalHeader.appendChild(modalTitle);
        modalTitle.appendChild(nameElement);
        modalHeader.appendChild(closeButtonElement);
        modalBody.appendChild(imageFront);
        modalBody.appendChild(imageBack);
        modalBody.appendChild(typesElement);
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weigthElement);
        modalBody.appendChild(abilities);
    
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
    
        modal.appendChild(modalContent);
        modal.classList.add('is-visible')
      }
    
      function hideModal() {
        modal.classList.remove('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
          hideModal();
        }
      });
      modal.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modal) {
          hideModal();
        }
      });
    

    return {
        add: add,
        getAll: getAll,
        filterByName: filterByName,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
