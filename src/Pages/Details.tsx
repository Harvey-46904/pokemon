import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/myStyles.css';
import StatBar from '../components/StatBar';

const Details: React.FC = () => {
  const { name, number } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const typeColors: { [key: string]: string } = {
    fire: 'bg-danger',
    water: 'bg-primary',
    grass: 'bg-success',
    electric: 'bg-warning',
    bug: 'bg-dark',
    poison: 'bg-purple',
    fairy: 'bg-pink',
    flying: 'bg-info',
    normal: 'bg-light',
    steel: 'bg-secondary',
    ghost: 'bg-secondary',
    dragon: 'bg-danger',
    ice: 'bg-info',
    fighting: 'bg-warning',
    psychic: 'bg-info',
    rock: 'bg-dark',
    ground: 'bg-warning',
    dark: 'bg-dark',
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
      setLoading(false); // Termina la carga cuando los datos se reciban
    };

    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="container text-light" style={{ height: "100vh" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5 col-12 text-center">
            <div className="skeleton skeleton-image" />
          </div>
          <div className="col-md-7 col-12">
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-light" style={{ height: "100vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 col-12 text-center degradado-radial" style={{ position: 'relative', height: '300px' }}>
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="d-block d-md-none">
                {pokemon.name} (#{number?.toString().padStart(3, '0')})
              </h1>
            </div>
          </div>
          <img
            src={pokemon.sprites.front_default}
            className="card-img-top"
            alt="Card image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
        </div>
        <div className="col-md-7 col-12">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-1 d-none d-md-block transparent-div">
                {pokemon.name} (#{number?.toString().padStart(3, '0')})
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center transparent-div">
              {pokemon.types.map((type: any) => (
                <button
                  key={type.type.name}
                  className={`btn ${typeColors[type.type.name]} text-white mx-1`}
                  style={{ margin: '5px' }}
                >
                  {type.type.name}
                </button>
              ))}
            </div>
          </div>
          <div className="row justify-content-center text-center transparent-div my-2">
            <div className="col-4"><b>Edad</b><br />Xxxx</div>
            <div className="col-4"><b>Peso</b><br />{pokemon.weight / 10} kg</div>
            <div className="col-4"><b>Género</b><br />Xxxx</div>
            <div className="col-4"><b>Habilidad</b><br />{pokemon.abilities?.[0]?.ability.name}</div>
            <div className="col-4"><b>Evolución</b><br />Xxxx</div>
            <div className="col-4"><b>Campeón</b><br />Xxxx</div>
          </div>
          <div className="row justify-content-center transparent-div">
            <h5>Estadísticas:</h5>
            <div className="col-12">
              {pokemon.stats.map((stat: any) => (
                <StatBar key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
