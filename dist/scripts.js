let pokemonRepository=function(){let t=[],e='https://pokeapi.co/api/v2/pokemon/?limit=150';function n(e){'object'==typeof e&&'name'in e?t.push(e):console.log('pokemon is not correct')}function i(t){pokemonRepository.loadDetails(t).then(function(){!function(t){let e=$('.modal-body'),n=$('.modal-title');n.empty(),e.empty();let i=$('<h1>'+t.name+'</h1>'),o=$('<img class="modal-img" style="width:50%">');o.attr('src',t.imageUrl);let l=$('<p>Height : '+t.height+'</p>'),a=$('<p>Weight : '+t.weight+'</p>'),s='<ul>';t.abilities.forEach(t=>{s+='<li>'+t.ability.name+'</li>'}),s+='</ul>';let p=$('<p>Abilities  '+s+'</p>'),r='<ul>';t.types.forEach(t=>{r+='<li>'+t.type.name+'</li>'}),r+='</ul>';let c=$('<p>Types '+r+'</p>');n.append(i),e.append(o),e.append(l),e.append(a),e.append(p),e.append(c)}(t)})}return{add:n,getAll:function(){return t},addListItem:function(t){let e=document.querySelector('.pokemon-list'),n=document.createElement('li');n.classList.add('group-list-item');let o=document.createElement('button');o.innerText=t.name,o.classList.add('pokebutton'),o.classList.add('btn'),o.classList.add('btn-primary'),o.setAttribute('data-toggle','modal'),o.setAttribute('data-target','#modal-container'),n.appendChild(o),e.appendChild(n),o.addEventListener('click',function(){i(t)})},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:function(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=e.types,t.weight=e.weight,t.abilities=e.abilities}).catch(function(t){console.error(t)})},showDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});