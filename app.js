document.getElementById("btn-search").addEventListener("click", async function () {

    try {

        let pokemon = document.getElementById("pokemon-name").value.toLowerCase();
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        let data = await response.json();

        document.getElementById("resultado").innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;

    } catch (error) {

        document.getElementById("resultado").innerHTML = `
            <p>Pokémon no encontrado.</p>
        `;
    }
});