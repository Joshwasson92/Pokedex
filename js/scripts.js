  let pokemonRepository = (function () {
    let pokemonList =[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150' ;
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
      }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pList = document.querySelector(".pokemon-list");
        let innerList = document.createElement('li');
        innerList.classList.add('group-list-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokebutton');
        button.classList.add('btn');
        button.classList.add('btn-primary')
        button.setAttribute("data-toggle","modal");
        button.setAttribute("data-target","#modal-container");
        innerList.appendChild(button);
        pList.appendChild(innerList);
        button.addEventListener('click', function(event){
            showDetails(pokemon)
          }
        );
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
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {

            // add details to the items)
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
            
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
          showModal(pokemon);
          
        });
      }

    function showModal(pokemon) {

        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");

       modalTitle.empty();
       modalBody.empty();

       let nameElement = $("<h1>" + pokemon.name + "</h1>");

       let imageElment = $('<img class="modal-img" style="width:50%">')
       imageElment.attr("src", pokemon.imageUrl);

       let heightElement =$("<p>" + "Height : " + pokemon.height + "</p>");

       let weightElement =$("<p>" + "Weight : " + pokemon.weight + "</p>");

       let abilitiesList = "<ul>"
        pokemon.abilities.forEach((ability) => {
          abilitiesList += "<li>" + (ability.ability.name) + "</li>";
        })
        abilitiesList += "</ul>";
       let abilitiesElement =$("<p>" + "Abilities  " + abilitiesList + "</p>");

       let typesList = "<ul>"
       pokemon.types.forEach((type) => {
         typesList += "<li>" + (type.type.name) + "</li>";
       })
       typesList += "</ul>";
       let typesElement =$("<p>" + "Types " + typesList + "</p>");
      
       modalTitle.append(nameElement);
       modalBody.append(imageElment);
       modalBody.append(heightElement);
       modalBody.append(weightElement);
       modalBody.append(abilitiesElement);
       modalBody.append(typesElement);
      

    }

    return {
        add ,
        getAll ,
        addListItem ,
        loadList ,
        loadDetails ,
        showDetails 
    }; 
})();

    pokemonRepository.loadList().then(function() {
        // data is loaded
        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
        });
    });

let pList = document.querySelector('.pokemon-list')
 pokemonRepository.getAll().forEach (pokemonRepository.addListItem);