export const fetchPokemonsList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=964');
  const data = await response.json();
  return data;
};

export const fetchBerries = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/berry');
  const data = await response.json();
  return data;
};

export const fetchURL = async (url, signal) => {
  try {
    const response = await fetch(url, {method: 'get', signal});
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
