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

for (let i=0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 2.0) {
        document.write('<p>', pokemonList[i].name + '(' + pokemonList[i].height + ')- Wow, that\'s big<br>');
    } else {
        document.write('<p>', pokemonList[i].name + '(' + pokemonList[i].height + ')<br>');
    }
}
