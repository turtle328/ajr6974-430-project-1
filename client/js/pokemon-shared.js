'use strict'
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

// Source: https://stackoverflow.com/a/679937/7838349
// Refactored into an error function
// Checks if an object is empty
const isEmpty = obj => Object.keys(obj).length === 0;

// Extracts the sprite data from the rather large pokeData object (it's quite nested in there)
const getSprite = data => data.sprites.other['official-artwork'].front_default;

// Extracts the types data from the pokeData object
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


// Takes in team data and its respective HTML slots and fills them in
const populateTeamSlots = (team, slots) => {
  for (let i = 0; i < team.length; i++) {
    slots[i].pokeData = team[i];

    const name = team[i].name;
    const types = team[i].types;
    const sprite = team[i].sprite;

    const pName = slots[i].querySelector('.poke-name');
    const img = slots[i].querySelector('img');

    pName.innerHTML = name;
    img.src = sprite;
    pokemonBackgroundType(slots[i], types);
  }
}

// Redirects the user to another page with its data filled in via session storage
// Also with confirm user before redirecting
const redirectWithData = (data, page) => {
  if (confirm("You will be redirected to another page with your team data prepopulated")) {
    sessionStorage.setItem("userData", JSON.stringify(data));
    location.href = page;
  }
}

// For handling the response for a POST ajax call
const handleResponse = (e) => {
  const xhr = e.target;
  const obj = xhr.response && JSON.parse(xhr.response);

  if (obj.message) {
    showSnackbar(obj.message);
  } else if (xhr.status === 204) {
    showSnackbar('Updated team');
  }
};

// Post data using urlencoded format and fetch
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });

  if (response.bodyUsed) {
    return response.json().then(res => {
      res.statusCode = response.status;
      return res;
    });
  } else {
    return { statusCode: response.status };
  }

}

let snackTimeout;

// Allows you to display information near the bottom of the screen for a few seconds
// Source: https://www.w3schools.com/howto/howto_js_snackbar.asp
const showSnackbar = (text) => {
  clearTimeout(snackTimeout);
  snackbar.innerHTML = text;
  snackbar.style.marginLeft = `-${snackbar.offsetWidth / 2}px`;
  snackbar.classList.add('show');
  snackTimeout = setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}
