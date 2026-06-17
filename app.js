// Variable global para almacenar el Pokémon buscado actualmente
let pokemonActual = null;

// Tarea de Daniel Casas (Persona 3): Buscar Pokémon
document.getElementById("btn-search").addEventListener("click", async function () {
    try {
        let pokemon = document.getElementById("pokemon-name").value.toLowerCase();
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        let data = await response.json();
        
        // Guardar los datos en la variable global para que Alexandra y Luis puedan usarlos
        pokemonActual = data;

        document.getElementById("resultado").innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;

    } catch (error) {
        // En caso de error, limpiar la variable global y mostrar mensaje
        pokemonActual = null;
        document.getElementById("resultado").innerHTML = `
            <p>Pokémon no encontrado.</p>
        `;
    }
});

// Tarea de Alexandra Castro (Persona 4): Guardar favorito
function saveFavorite() {
    // verificar pokemonActual
    if (!pokemonActual) {
        alert("Primero busca un Pokemon");
        return;
    }

    // obtener favoritos
    const favoritosGuardados = localStorage.getItem("favoritos");

    // Convertir a array o crear uno vacío
    const favoritos = favoritosGuardados
        ? JSON.parse(favoritosGuardados)
        : [];

    // verificar duplicados
    const existe = favoritos.some(
        pokemon => pokemon.name === pokemonActual.name
    );
    
    // agregar pokemon
    if (!existe) {
        favoritos.push(pokemonActual);

        // guardar
        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );
    }

    // actualizar lista
    updateFavoritesList();
}

// Tarea de Luis Imbachi (Persona 5): Mostrar favoritos
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
        const pokemonCard = document.createElement('li');
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
