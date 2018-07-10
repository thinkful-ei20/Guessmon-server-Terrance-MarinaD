const {LinkedList, _Node} = require('./linkedlist');

const pikachu = {
  'silhouette': 'https://vignette.wikia.nocookie.net/joke-battles/images/0/0d/Pokemon-Pikachu-Silhouette-Stencil-thumb.jpg/revision/latest?cb=20180210155820',
  'filledIn': 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
  'answer': 'pikachu',
  'correct': 0,
  'total': 0,
  'm': 1
};

const head = new _Node(pikachu, null);

const squirtle = {
  'silhouette': 'http://oi44.tinypic.com/34hbf51.jpg',
  'filledIn': 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
  'answer': 'squirtle',
  'correct': 0,
  'total': 0,
  'm': 1
};

const bulbasaur = 
{ 
  'silhouette': 'https://freestencilgallery.com/wp-content/uploads/2017/04/Pokemon-Bulbasaur-Silhouette-Stencil-thumb.jpg',
  'filledIn': 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  'answer': 'bulbasaur',
  'correct': 0,
  'total': 0,
  'm': 1
};


const defaultList = new LinkedList();
defaultList.head = head;
defaultList.insertAt(squirtle, 1);
defaultList.insertAt(bulbasaur, 2);
console.log(JSON.stringify(defaultList,null,2));

module.exports = defaultList;
