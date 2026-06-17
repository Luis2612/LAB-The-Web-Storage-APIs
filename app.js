function updateFavoritesList() {
const favoritosDiv = document.getElementById('favoritos');
    favoritosDiv.innerHTML = '';
    const favoritosStr = localStorage.getItem('favoritos');
    if (!favoritosStr) {
        favoritosDiv.innerHTML = '<p>No tienes ningún Pokémon en favoritos.</p>';
        return;
    }
    let listaFavoritos = [];
    try {
        listaFavoritos = JSON.parse(favoritosStr);
    } catch (error) {
        console.error("Error al analizar los favoritos de localStorage:", error);
        listaFavoritos = [];
    }
    if (listaFavoritos.length === 0) {
        favoritosDiv.innerHTML = '<p>No tienes ningún Pokémon en favoritos.</p>';
        return;
    }
    listaFavoritos.forEach(function(pokemon) {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'favorite-card'; 
        const pokemonName = pokemon.name;
        const pokemonImage = pokemon.image || (pokemon.sprites && pokemon.sprites.front_default);
        pokemonCard.innerHTML = `
            <img src="${pokemonImage}" alt="${pokemonName}" class="favorite-image">
            <span class="favorite-name">${pokemonName}</span>
        `;
        favoritosDiv.appendChild(pokemonCard);
    });
}
document.addEventListener("DOMContentLoaded", function() {
    updateFavoritesList();
});
