
 let pokemonRepository = (function () {

    let pokeList =[
     {name: 'Tentacruel', height: 5, type: ['Water', 'Poison']},
     {name: 'Seadra', height: 4, type: ['Water']},
     {name: 'Starmie', height: 3,  type: ['Water', 'Psychic']},
     {name: 'Seaking', height: 4, type: ['Water']},
     {name: 'Lapras', height: 8, type: ['Water', 'Ice']},
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokeList;
    }
    
    function showDetails(pokemon){
        let pokemonInfo = document.getElementById('li')
        console.log (pokemon.name, pokemon.type)

    }

    function addListItem(pokemon) {
        let innerList = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('pokebutton');
        innerList.appendChild(button);
        pList.appendChild(innerList);
        button.addEventListener('click', function(){
            showDetails(pokemon)});
    }

    return {
        add ,
        getAll ,
        addListItem ,
        showDetails ,
    };
    
})();
    console.log (pokemonRepository.getAll() );

let pList = document.querySelector('.pokemon-list')
 pokemonRepository.getAll().forEach (pokemonRepository.addListItem);

// Below are previous loop iterations 


// for (let i = 0; i < pokeList.length; i++) {
//     let height = pokeList[i].height
//     let name = pokeList[i].name
//     let pokemonInfo = `<p> Name: ${name} Height: ${height}`
//     //Template String - 
//     if (height > 4) {
//      pokemonInfo += " Wow, Thats big! "
//     } 
//     if (height < 4) {
//         pokemonInfo += " That is a small Pokemon! "
//        } 
//        if (height === 4) {
//         pokemonInfo += " That is an average sized Pokemon! "
//        } 
//     pokemonInfo += "</p>"
//     document.write(pokemonInfo);
// }

  
 
//  test while loop
// let j=0; 
// while (j < pokeList.length){
//     document.write(`Name: ${pokeList[j].name} Height: ${pokeList[j].height}`);
//     j++
// }