// pokemon type colors in hex
const typeColors = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
};

const getSprite = (data) => data.sprites.other['official-artwork'].front_default;

const getTypesList = (data) => {
  const types = [];

  for (const type of data.types) {
    types.push(type.type.name);
  }

  return types;
};

/**
 * Modify the div's background base on pokemon's types
 * @param {HTMLElement} div The div to modify
 * @param {Array<string>} types List of Pokemon types, either an array of one or two
 */
const pokemonBackgroundType = (div, types) => {
  div.style.backgroundColor = '';
  div.style.background = '';
  if (types.length === 1) {
    div.style.backgroundColor = typeColors[types[0]];
  } else {
    div.style.background = `linear-gradient(90deg, ${typeColors[types[0]]} 50%, ${typeColors[types[1]]} 50%)`;
  }
};

const handleResponse = (e) => {
  const xhr = e.target;
  const obj = xhr.response && JSON.parse(xhr.response);
  console.dir(obj);

  if (obj.message) {
    snackbar.innerHTML = obj.message;
  } else if (xhr.status === 204) {
    snackbar.innerHTML = 'Updated team';
  }

  snackbar.style.marginLeft = `-${snackbar.offsetWidth / 2}px`;
  snackbar.classList.add('show');
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
};
