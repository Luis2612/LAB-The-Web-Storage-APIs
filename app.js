document.getElementById("btn-search").addEventListener("click", async function () {

    let pokemon = document.getElementById("pokemon-name").value.toLowerCase();
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await response.json();

    document.getElementById("nombre").textContent = data.name;
    document.getElementById("imagen").src = data.sprites.front_default;

});