const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
const pokemonAbilities = document.getElementById("pokemon-abilities");


const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {

        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonImage = document.getElementById("pokemon-image");
        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonSkills = pokemonAbilities;

        pokemonImage.src = response.sprites.front_default;

        pokemonName.textContent = response.name;
        pokemonStats.innerHTML = "";
        if (pokemonSkills) pokemonSkills.innerHTML = "";


        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        })
        if (pokemonSkills) {
            const abilities = response.abilities ?? [];

            if (abilities.length === 0) {
                pokemonSkills.textContent = "Sin habilidades.";
            } else {
                pokemonSkills.innerHTML = "";

                const ul = document.createElement("ul");
                ul.id = "pokemon-abilities-list";

                abilities.forEach((entry) => {
                    const name = entry?.ability?.name;
                    if (!name) return;

                    const li = document.createElement("li");
                    li.textContent = name.replace(/-/g, " ");
                    ul.appendChild(li);
                });


                pokemonSkills.appendChild(ul);
            }
        }


    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}
