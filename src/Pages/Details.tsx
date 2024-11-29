// src/Pages/Details.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/MyStyles.css';

const Details: React.FC = () => {
  const { name, number } = useParams();  // Captura los parámetros `name` y `number` de la URL
  const [pokemon, setPokemon] = useState<any>(null);
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
    };
    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="container text-light " style={{ height: "100vh" }}>
      <div className="row justify-content-center align-items-center" >
        <div className="col-md-5 col-12 text-center degradado-radial" style={{ position: 'relative', height: '300px' }}>
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="d-block d-md-none ">
                {pokemon.name} (#{number?.toString().padStart(3, '0')})
              </h1>  {/* Muestra el nombre y el número solo en pantallas móviles */}
            </div>
          </div>
          <img
            src={pokemon.sprites.front_default}
            className="card-img-top"
            alt="Card image"
            style={{

              width: '100%',       // Ocupa todo el ancho disponible
              height: '100%',      // Ocupa todo el alto disponible
              objectFit: 'cover',  // Mantiene la proporción y recorta la imagen si es necesario
              borderRadius: '50%', // Hace la imagen circular
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
                  className={`btn ${typeColors[type.type.name]} text-white mx-1`}  // Usa el color asignado para cada tipo
                  style={{ margin: '5px' }}
                >
                  {type.type.name}
                </button>
              ))}

            </div>
          </div>
          <div className="row justify-content-center text-center transparent-div my-2">
            {/* Aquí puedes agregar atributos específicos como Edad, Peso, Genero, etc. */}
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
              <ul>
                {pokemon.stats.map((stat: any) => (
                  <li key={stat.stat.name}>
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
