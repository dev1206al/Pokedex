/**
 * Realiza una solicitud para obtener información de todos los Pokémon y muestra sus tarjetas en la página.
 */
async function fetchAllPokemon() {
    // Realizar una solicitud para obtener la lista de Pokémon
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();
    const pokemonList = data.results;

    // Crear una lista de promesas para obtener los datos detallados de cada Pokémon
    const promises = pokemonList.map(async pokemon => {
        const pokemonDataResponse = await fetch(pokemon.url);
        return pokemonDataResponse.json();
    });
    // Esperar a que se completen todas las promesas y obtener los datos detallados de cada Pokémon
    const pokemonDataList = await Promise.all(promises);

    // Mostrar las tarjetas de los Pokémon en la página
    pokemonDataList.forEach(pokemonData => {
        // Determinar el color de fondo de la tarjeta según el tipo de Pokémon
        let cardBgClass = 'bg-extra'; // Color de fondo predeterminado
        // Asignar color de fondo según el tipo de Pokémon
        pokemonData.types.forEach(type => {
            if (type.type.name === 'water') {
                cardBgClass = 'bg-blue'; // Azul para Pokémon de agua
            } else if (type.type.name === 'fire') {
                cardBgClass = 'bg-orange'; // Naranja para Pokémon de fuego
            } else if (type.type.name === 'grass' || type.type.name === 'bug') {
                cardBgClass = 'bg-green'; // Verde para Pokémon de tierra y bicho
            } else if (type.type.name === 'poison') {
                cardBgClass = 'bg-purple'; // Morado para Pokémon de veneno
            } else if (type.type.name === 'electric') {
                cardBgClass = 'bg-yellow'; // Amarillo para Pokémon electrico
            } else if (type.type.name === 'normal') {
                cardBgClass = 'bg-normal'; // Normal para Pokémon normales
            } else if (type.type.name === 'fairy') {
                cardBgClass = 'bg-fairy'; // Rosa para Pokémon hada
            } else if (type.type.name === 'fighting') {
                cardBgClass = 'bg-fight'; // Rojo para Pokémon lucha
            } else if (type.type.name === 'psychic') {
                cardBgClass = 'bg-psychic'; // Morado para Pokémon psíquico
            } else if (type.type.name === 'rock') {
                cardBgClass = 'bg-rock'; // Gris para Pokémon roca
            }
        });
        // Capitalizar el nombre del Pokémon
        const capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

        // Crear la tarjeta HTML del Pokémon
        const pokemonCard = `
<div class="col-4 mb-3">
<div class="card card-horizontal ${cardBgClass}" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
    <img src="${pokemonData.sprites.front_default}" class="card-img" alt="${pokemonData.name}">
    <div class="card-overlay" style="position: absolute; top: 0; left: 0; width: 30%; height: 100%; background-image: url('./img/overlay.png'); background-size: cover; opacity: 0.25;"></div>
    <div class="card-body" style="margin-top: 10px;">
        <h5 class="card-title">${capitalizedPokemonName}</h5>
        <p class="card-text"><b>Tipo:</b> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        <p class="card-text"><b>Número:</b> <span style="font-weight: bold;">#</span>${pokemonData.id}</p>
        <button class="btn btn-primary" onclick="showDetails('${pokemonData.name}')">Ver detalles</button>
    </div>
</div>
</div>

`;
    // Agregar la tarjeta del Pokémon al contenedor en la página
        document.getElementById('pokemonContainer').innerHTML += pokemonCard;

    });
}

/**
 * Función para buscar Pokémon por nombre y mostrarlos en tarjetas.
 * Se realiza una búsqueda dinámica mientras se escribe en el campo de búsqueda.
 */
let timerId;

function searchPokemonByName() {
    clearTimeout(timerId);
    timerId = setTimeout(async () => {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=394`);
        const data = await response.json();
        const pokemonList = data.results;
        const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.startsWith(searchValue));

        const promises = filteredPokemonList.map(async pokemon => {
            const pokemonDataResponse = await fetch(pokemon.url);
            return pokemonDataResponse.json();
        });

        const pokemonDataList = await Promise.all(promises);

        const pokemonContainer = document.getElementById('pokemonContainer');
        pokemonContainer.innerHTML = ''; // Limpiar el contenido actual

        pokemonDataList.forEach(pokemonData => {
            let cardBgClass = 'bg-extra'; // Color de fondo predeterminado
            // Asignar color de fondo según el tipo de Pokémon
            pokemonData.types.forEach(type => {
                if (type.type.name === 'water') {
                    cardBgClass = 'bg-blue'; // Azul para Pokémon de agua
                } else if (type.type.name === 'fire') {
                    cardBgClass = 'bg-orange'; // Naranja para Pokémon de fuego
                } else if (type.type.name === 'grass' || type.type.name === 'bug') {
                    cardBgClass = 'bg-green'; // Verde para Pokémon de tierra y bicho
                } else if (type.type.name === 'poison') {
                    cardBgClass = 'bg-purple'; // Morado para Pokémon de veneno
                } else if (type.type.name === 'electric') {
                    cardBgClass = 'bg-yellow'; // Amarillo para Pokémon electrico
                } else if (type.type.name === 'normal') {
                    cardBgClass = 'bg-normal'; // Normal para Pokémon normales
                } else if (type.type.name === 'fairy') {
                    cardBgClass = 'bg-fairy'; // Rosa para Pokémon hada
                } else if (type.type.name === 'fighting') {
                    cardBgClass = 'bg-fight'; // Rojo para Pokémon lucha
                } else if (type.type.name === 'psychic') {
                    cardBgClass = 'bg-psychic'; // Morado para Pokémon psíquico
                } else if (type.type.name === 'rock') {
                    cardBgClass = 'bg-rock'; // Gris para Pokémon roca
                }
            });
            const capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

            const pokemonCard = `
            <div class="col-4 mb-3">
            <div class="card card-horizontal ${cardBgClass}" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
                <img src="${pokemonData.sprites.front_default}" class="card-img" alt="${pokemonData.name}">
                <div class="card-overlay" style="position: absolute; top: 0; left: 0; width: 30%; height: 100%; background-image: url('./img/overlay.png'); background-size: cover; opacity: 0.25;"></div>
                <div class="card-body" style="margin-top: 10px;">
                    <h5 class="card-title">${capitalizedPokemonName}</h5>
                    <p class="card-text"><b>Tipo:</b> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                    <p class="card-text"><b>Número:</b> <span style="font-weight: bold;">#</span>${pokemonData.id}</p>
                    <button class="btn btn-primary" onclick="showDetails('${pokemonData.name}')">Ver detalles</button>
                </div>
            </div>
            </div>
            
            `;
            pokemonContainer.innerHTML += pokemonCard;
        });
    }, 200); // Esperar 200  milisegundos después de la última tecla presionada
}


// Escuchar el evento de entrada en el campo de búsqueda
document.getElementById('searchInput').addEventListener('input', searchPokemonByName);

/**
 * Busca y muestra los Pokémon del tipo especificado.
 * @param {string} type - El tipo de Pokémon a buscar.
 */
async function searchByType(type) {
    try {
          // Realizar una solicitud a la API para obtener la lista de Pokémon del tipo especificado
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        const pokemonList = data.pokemon;

        // Vaciar el contenedor antes de agregar los Pokémon del nuevo tipo
        document.getElementById('pokemonContainer').innerHTML = '';

        // Crear un array para almacenar todas las promesas de fetch
        const promises = pokemonList.map(async pokemon => {
            const pokemonDataResponse = await fetch(pokemon.pokemon.url);
            const pokemonData = await pokemonDataResponse.json();
            return pokemonData;
        });

        // Esperar a que todas las promesas se resuelvan
        const resolvedPokemons = await Promise.all(promises);

        // Mostrar las tarjetas de Pokémon una vez que todas las promesas se hayan resuelto
        resolvedPokemons.forEach(pokemonData => {
            let cardBgClass = 'bg-extra'; // Color de fondo predeterminado
            // Asignar color de fondo según el tipo de Pokémon
            pokemonData.types.forEach(pokemonType => {
                if (pokemonType.type.name === 'water') {
                    cardBgClass = 'bg-blue'; // Azul para Pokémon de agua
                } else if (pokemonType.type.name === 'fire') {
                    cardBgClass = 'bg-orange'; // Naranja para Pokémon de fuego
                } else if (pokemonType.type.name === 'grass' || pokemonType.type.name === 'bug') {
                    cardBgClass = 'bg-green'; // Verde para Pokémon de tierra y bicho
                } else if (pokemonType.type.name === 'poison') {
                    cardBgClass = 'bg-purple'; // Púrpura para Pokémon de veneno
                } else if (pokemonType.type.name === 'electric') {
                    cardBgClass = 'bg-yellow'; // Amarillo para Pokémon eléctrico
                } else if (pokemonType.type.name === 'normal') {
                    cardBgClass = 'bg-normal'; // Normal para Pokémon normales
                } else if (pokemonType.type.name === 'fairy') {
                    cardBgClass = 'bg-fairy'; // Rosa para Pokémon hada
                } else if (pokemonType.type.name === 'fighting') {
                    cardBgClass = 'bg-fight'; // Rojo para Pokémon lucha
                } else if (pokemonType.type.name === 'psychic') {
                    cardBgClass = 'bg-psychic'; // Morado para Pokémon psíquico
                } else if (pokemonType.type.name === 'rock') {
                    cardBgClass = 'bg-rock'; // Gris para Pokémon roca
                }
            });

             // Capitalizar el nombre del Pokémon
            const capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

             // Crear la tarjeta HTML para mostrar el Pokémon
            const pokemonCard = `
            <div class="col-4 mb-3">
            <div class="card card-horizontal ${cardBgClass}" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
                <img src="${pokemonData.sprites.front_default}" class="card-img" alt="${pokemonData.name}">
                <div class="card-overlay" style="position: absolute; top: 0; left: 0; width: 30%; height: 100%; background-image: url('./img/overlay.png'); background-size: cover; opacity: 0.25;"></div>
                <div class="card-body" style="margin-top: 10px;">
                    <h5 class="card-title">${capitalizedPokemonName}</h5>
                    <p class="card-text"><b>Tipo:</b> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                    <p class="card-text"><b>Número:</b> <span style="font-weight: bold;">#</span>${pokemonData.id}</p>
                    <button class="btn btn-primary" onclick="showDetails('${pokemonData.name}')">Ver detalles</button>
                </div>
            </div>
            </div>
            
            `;
            // Agregar la tarjeta al contenedor
            document.getElementById('pokemonContainer').innerHTML += pokemonCard;
        });
    } catch (error) {
        // Manejar cualquier error que ocurra durante la búsqueda
        console.error('Error searching by type:', error);
    }
}

/**
 * Muestra los detalles del Pokémon especificado en un modal.
 * @param {string} pokemonName - El nombre del Pokémon.
 */
function showDetails(pokemonName) {
     // Realizar una solicitud a la API para obtener los detalles del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(pokemonData => {
             // Configurar el encabezado del modal con el color del tipo del Pokémon
            const modalHeader = document.querySelector('#pokemonModal .modal-header');
            modalHeader.style.backgroundColor = getTypeColor(pokemonData.types[0].type.name);

             // Configurar el cuerpo del modal con los detalles del Pokémon
            const modalBody = document.getElementById('pokemonDetails');
            modalBody.innerHTML = `
            <p><b>Nombre:</b> ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" style="float: right; margin-left: 20px;">
            <p><b>Peso:</b> ${pokemonData.weight} g</p>
            <p><b>Altura:</b> ${pokemonData.height} cm</p>
            <p><b>Movimientos:</b></p>
            <ul style="columns: 6;">
                ${pokemonData.moves.map(move => `<li>${move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}</li>`).join('')}
            </ul>
            `;
            // Mostrar el modal con los detalles del Pokémon
            const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
            modal.show();
        })
        .catch(error => {
             // Manejar cualquier error que ocurra durante la obtención de los detalles del Pokémon
            console.error('Error fetching Pokemon details:', error);
        });
}

/**
 * Divide los movimientos en columnas para mostrar en el modal.
 * @param {Array} moves - La lista de movimientos del Pokémon.
 * @param {number} numColumns - El número de columnas en las que dividir los movimientos.
 * @returns {Array} - Un array de arrays, donde cada subarray contiene los movimientos de una columna.
 */
function splitMovesIntoColumns(moves, numColumns) {
    const movesPerColumn = Math.ceil(moves.length / numColumns);
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
        columns.push(moves.slice(i * movesPerColumn, (i + 1) * movesPerColumn));
    }
    return columns;
}

/**
 * Retorna el color asociado al tipo de Pokémon especificado.
 * @param {string} typeName - El nombre del tipo de Pokémon.
 * @returns {string} - El color asociado al tipo de Pokémon.
 */
function getTypeColor(typeName) {
    switch (typeName) {
        case 'water':
            return '#6890F0'; // Azul para Pokémon de agua
        case 'fire':
            return '#EE8130'; // Naranja para Pokémon de fuego
        case 'grass':
        case 'bug':
            return '#7AC74C'; // Verde para Pokémon de tierra y bicho
        case 'poison':
            return '#A33EA1'; // Púrpura para Pokémon de veneno
        case 'electric':
            return '#F7D02C'; // Amarillo para Pokémon eléctrico
        case 'normal':
            return '#A8A77A'; // Normal para Pokémon normales
        case 'fairy':
            return '#D685AD'; // Rosa para Pokémon hada
        case 'fighting':
            return '#C22E28'; // Rojo para Pokémon lucha
        case 'psychic':
            return '#F95587'; // Morado para Pokémon psíquico
        case 'rock':
            return '#B6A136'; // Gris para Pokémon roca
        default:
            return '#333'; // Color por defecto
    }
}

// Realizar una solicitud para obtener y mostrar todos los Pokémon
fetchAllPokemon();

// Reproducir la música de fondo cuando la página se haya cargado completamente
window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
});

