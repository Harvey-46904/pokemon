import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLimit, setOffset, setSearch } from '../Store/pokemonSlice';
import { RootState } from '../Store/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomCard from '../components/CustomCard';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { limit, offset, search } = useSelector((state: RootState) => state.pokemon);

  const [pokemonList, setPokemonList] = useState<any[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get('search') || '';
    if (querySearch !== search) {
      dispatch(setSearch(querySearch));
    }
  }, [searchParams, dispatch, search]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      if (offset === 0) {
        setPokemonList(data.results);
      } else {
        setPokemonList((prevList) => [...prevList, ...data.results]);
      }
    };
    fetchPokemonData();
  }, [limit, offset]);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  let contador = 1;

  const loadMore = () => {
    contador = 1;
    dispatch(setOffset(offset + limit));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    dispatch(setSearch(newSearch));
    setSearchParams({ search: newSearch });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-4">
            <div className="form-group">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Buscar Pokémon"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredPokemon.map((pokemon) => (
            <div className="col-md-3 col-6 py-4 text-center">
              <CustomCard
                number={contador++}
                name={pokemon.name}
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button onClick={loadMore} className="btn btn-success">
              Cargar más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
