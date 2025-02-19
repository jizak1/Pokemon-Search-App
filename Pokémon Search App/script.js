document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonId = document.getElementById('pokemon-id');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const types = document.getElementById('types');
    const hp = document.getElementById('hp');
    const attack = document.getElementById('attack');
    const defense = document.getElementById('defense');
    const specialAttack = document.getElementById('special-attack');
    const specialDefense = document.getElementById('special-defense');
    const speed = document.getElementById('speed');
    const sprite = document.getElementById('sprite');

    // Color mapping untuk Pokemon types
    const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };

    const updateStatBars = (stats) => {
        const maxStat = 255; // Maximum possible stat value ye
        stats.forEach(stat => {
            const statBar = document.getElementById(`${stat.name}-bar`);
            if (statBar) {
                const percentage = (stat.value / maxStat) * 100;
                statBar.style.width = `${percentage}%`;
            }
        });
    };

// Search for the pokemon nih yak 
    const searchPokemon = async () => {
        try {
            const searchTerm = searchInput.value.toLowerCase();
            if (!searchTerm) {
                alert('Please enter a Pokémon name or ID');
                return;
            }

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }

            const data = await response.json();

        
            if (document.getElementById('sprite')) {
                document.getElementById('sprite').remove();
            }

       
            const spriteImg = document.createElement('img');
            spriteImg.id = 'sprite';
            spriteImg.src = data.sprites.front_default;
            document.querySelector('.pokemon-image').appendChild(spriteImg);

  
            pokemonName.textContent = data.name.toUpperCase();
            pokemonId.textContent = `#${data.id}`;
            weight.textContent = `Weight: ${data.weight}`;
            height.textContent = `Height: ${data.height}`;

       
            types.innerHTML = '';
            data.types.forEach(type => {
                const typeElement = document.createElement('span');
                typeElement.textContent = type.type.name.toUpperCase();
                typeElement.className = 'type-badge';
                typeElement.style.backgroundColor = typeColors[type.type.name] || '#777';
                types.appendChild(typeElement);
            });

     
            const stats = data.stats;
            const statsMapping = {
                'hp': hp,
                'attack': attack,
                'defense': defense,
                'special-attack': specialAttack,
                'special-defense': specialDefense,
                'speed': speed
            };

            stats.forEach(stat => {
                const statElement = statsMapping[stat.stat.name];
                if (statElement) {
                    statElement.textContent = stat.base_stat;
                }
            });

        
            const statsForBars = stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
            }));
            updateStatBars(statsForBars);

    
            document.querySelector('.pokemon-card').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.pokemon-card').classList.remove('shake');
            }, 500);

        } catch (error) {
            alert('Pokémon not found');
            console.error('Error:', error);
        }
    };

    // Event Listeners
    searchButton.addEventListener('click', searchPokemon);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });


    const loadRandomPokemon = async () => {
        const randomId = Math.floor(Math.random() * 898) + 1; 
        searchInput.value = randomId;
        await searchPokemon();
    };
    loadRandomPokemon();
});
// Mamaaa i made ittt