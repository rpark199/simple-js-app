let pokemonRepository = (function () {
    let pokemonList = []
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct')
        }
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
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Modal shows display of the pokemon details
    let modal = document.querySelector('.modal');

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            let titleElement = document.querySelector('#titleModal');
            titleElement.textContent = item.name;

            let contentElement = document.querySelector('.modal-body');
            contentElement.innerHTML = '';

            let imgElement = document.createElement('img');
            imgElement.src = item.imgUrl;
            imgElement.alt = item.name;
            imgElement.classList.add('img-fluid');
            contentElement.appendChild(imgElement);

            let heightItem = document.createElement('p');
            heightItem.textContent = 'Height: ' + item.height + "'";
            contentElement.appendChild(heightItem);

            let titleTypes = document.createElement('span');
            titleElement.classList.add('spanType');
            titleTypes.innerText = 'Type: ';

            let containerTypes = document.createElement('div');
            containerTypes.classList.add('type-container', 'container', 'row');
            contentElement.appendChild(containerTypes);
            containerTypes.appendChild(titleTypes);

            item.types.forEach((element) => {
                let typeElement = document.createElement('button');
                typeElement.classList.add('btn-lg', 'type-content');
                typeElement.innerText = element.type.name;
                containerTypes.appendChild(typeElement);
            });
        });
    }

    $('#exampleModal').on('show.bs.modal', function (event) {
        let pokemonID = event.relatedTarget.dataset.id;
        showDetails(pokemonList[pokemonID]);
    });

    $('#searchItem').on('change input', function (event) {
        let inputText = $('#searchItem').val();
        filterByName(inputText);
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
