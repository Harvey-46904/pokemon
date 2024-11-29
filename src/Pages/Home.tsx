// src/Pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLimit, setOffset, setSearch } from '../Store/pokemonSlice';
import { RootState } from '../Store/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomCard from '../components/CustomCard';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener valores de Redux
  const { limit, offset, search } = useSelector((state: RootState) => state.pokemon);

  const [pokemonList, setPokemonList] = useState<any[]>([]);

  // Obtener los query params de búsqueda
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializar el search desde los query params si no hay valor en Redux
  useEffect(() => {
    const querySearch = searchParams.get('search') || '';
    if (querySearch !== search) {
      dispatch(setSearch(querySearch)); // Sincronizar el valor del search con Redux
    }
  }, [searchParams, dispatch, search]);

  // Fetch Pokémon data cuando limit o offset cambian
  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      // Si es la primera carga, reseteamos la lista. Si no, agregamos los nuevos Pokémon
      if (offset === 0) {
        setPokemonList(data.results); // Carga inicial, reemplazamos la lista
      } else {
        setPokemonList((prevList) => [...prevList, ...data.results]); // Agrega más Pokémon al final
      }
    };
    fetchPokemonData();
  }, [limit, offset]); // Se ejecuta cuando limit o offset cambian

  // Filtrar los Pokémon por el nombre desde el cliente
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  let contador = 1;  // Iniciar el contador correctamente basado en el offset

  // Función para cargar más Pokémon
  const loadMore = () => {
    contador = 1;
    dispatch(setOffset(offset + limit));  // Actualiza el offset con el nuevo valor
  };

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    dispatch(setSearch(newSearch));  // Actualiza el valor del buscador en Redux
    setSearchParams({ search: newSearch });  // Actualiza el query param search en la URL
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-4">


            <div className="form-group">
              <input type="text" value={search}
                onChange={handleSearchChange} className="form-control" id="exampleInputPassword1" placeholder="Buscar Pokémon" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredPokemon.map((pokemon) => (
            <div className="col-md-3 col-6 py-4 text-center">
              <CustomCard
                number={contador++} // Número de Pokémon
                name={pokemon.name}
              // Usamos la imagen de sprites de la API
              />
            </div>

          ))}

        </div>
      </div>




      {/* Botón de cargar más */}
      <button onClick={loadMore}>Cargar más</button>
    </div>
  );
};

export default Home;
