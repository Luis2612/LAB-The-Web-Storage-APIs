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
    )
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