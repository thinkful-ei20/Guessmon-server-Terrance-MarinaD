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
  'silhouette': 'https://image.ibb.co/cLLXxT/squirtle_sil.png',
  'filledIn': 'https://image.ibb.co/dii7Wo/squirtle.png',
  'answer': 'squirtle',
  'correct': 0,
  'total': 0,
  'm': 1
};

const bulbasaur = 
{ 
  'silhouette': 'https://image.ibb.co/hkruBo/bulbasaur_sil.png',
  'filledIn': 'https://image.ibb.co/i3Y7Wo/bulbasaur.png',
  'answer': 'bulbasaur',
  'correct': 0,
  'total': 0,
  'm': 1
};

const chansey = { 
  'silhouette': 'https://image.ibb.co/jzB5HT/chansey_sil.png',
  'filledIn': 'https://image.ibb.co/gkWi48/chansey.png',
  'answer': 'chansey',
  'correct': 0,
  'total': 0,
  'm': 1
};

const charmander = {
  'silhouette': 'https://image.ibb.co/cvZQHT/charmander_sil.png',
  'filledIn': 'https://image.ibb.co/gf7ecT/charmander.png',
  'answer': 'charmander',
  'correct': 0,
  'total': 0,
  'm': 1
};

const exeggutor = {
  'silhouette': 'https://image.ibb.co/etrSWo/exeggutor_sil.png',
  'filledIn': 'https://image.ibb.co/ePVbP8/exeggutor.png',
  'answer': 'exeggutor',
  'correct': 0,
  'total': 0,
  'm': 1
};

const rattata = {
  'silhouette': 'https://image.ibb.co/h0aAj8/rattata_sil.png',
  'filledIn': 'https://image.ibb.co/mOhCxT/rattata.png',
  'answer': 'rattata',
  'correct': 0,
  'total': 0,
  'm': 1
};

const sandslash = {
  'silhouette': 'https://image.ibb.co/jD4QHT/sandslash_sil.png',
  'filledIn': 'https://image.ibb.co/mWBSWo/sandslash.png',
  'answer': 'sandslash',
  'correct': 0,
  'total': 0,
  'm': 1
};

const scyther = {
  'silhouette': 'https://image.ibb.co/m3i7Wo/scyther_sil.png',
  'filledIn': 'https://image.ibb.co/kQvbP8/scyther.png',
  'answer': 'scyther',
  'correct': 0,
  'total': 0,
  'm': 1
};

const voltorb = {
  'silhouette': 'https://image.ibb.co/emzQHT/voltorb_sil.png',
  'filledIn': 'https://image.ibb.co/gDN1ro/voltorb.png',
  'answer': 'voltorb',
  'correct': 0,
  'total': 0,
  'm': 1
};

const weepinbell = {
  'silhouette': 'https://image.ibb.co/nuQzcT/weepinbell_sil.png',
  'filledIn': 'https://image.ibb.co/m0dwP8/weepinbell.png',
  'answer': 'weepinbell',
  'correct': 0,
  'total': 0,
  'm': 1
};

const defaultList = new LinkedList();
defaultList.head = head;
defaultList.insertAt(squirtle, 1);
defaultList.insertAt(bulbasaur, 2);
defaultList.insertAt(chansey, 3);
defaultList.insertAt(charmander, 4);
defaultList.insertAt(exeggutor, 5);
defaultList.insertAt(rattata, 6);
defaultList.insertAt(sandslash, 7);
defaultList.insertAt(scyther, 8);
defaultList.insertAt(voltorb, 2);
defaultList.insertAt(weepinbell, 9);







module.exports = defaultList;
