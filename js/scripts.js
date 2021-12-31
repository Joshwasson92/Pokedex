
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
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokebutton');
        innerList.appendChild(button);
        pList.appendChild(innerList);
        button.addEventListener('click', function(event){
            showDetails(pokemon)});
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {

            // add details to the items)
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;

        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {

          showModal(pokemon.name, pokemon.height,pokemon.imageUrl);
        });
      }
      function showModal(title, text, image) {

        // Clear all existing modal content
        modalContainer.innerHTML = '';
        
        // Create new element
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        
        let contentElement = document.createElement('p');
        contentElement.innerText = "Height:" + text + "'";

        let imageElment = document.createElement('img');
        imageElment.src=image;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElment);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
      }
      
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
      

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
          
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

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