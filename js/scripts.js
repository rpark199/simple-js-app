let pokemonRepository= (function(){
    let pokemonList = [
        {
            id: 1,
            name: "Charizard",
            height: 1.7,
            weight: 90.5,
            types: ["fire"],
        },
        {
            id: 2,
            name: "Venusaur",
            height: 2,
            weight: 100,
            types: ["grass"],
        },
        {
            id: 3,
            name: "Dragonite",
            height: 2.2,
            weight: 210,
            types: ["water"],
        },
    ];
    let apiUrl= "https://pokeapi.co/api/v2/pokemon/?limit=150";

    for (let i=0; i < pokemonList.length; i++) {
        if (pokemonList[i].height > 2.0) {
            document.write('<p>', pokemonList[i].name + '(' + pokemonList[i].height + ')- Wow, that\'s big<br>');
        } else {
            document.write('<p>', pokemonList[i].name + '(' + pokemonList[i].height + ')<br>');
        }
    }
    function add(pokemon) {
        if (typeof pokemon === 'object' &&
            'name'in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
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
function addListitem(pokemon) {
    let pokemonList=document.querySelector('pokemon-list');
    let li=document.createElement('li');
    pokemonList.appendChild(li);
    li.classList.add('pokemon-name-list');
    let button=document.createElement('button');
    button.innerText= pokemon.name;
    li.appendChild(button);
    button.classList.add('pokemon-name-button')
}
return{
    add: add,
    getAll: getAll,
    filterByName: filterByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
};
})();
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
