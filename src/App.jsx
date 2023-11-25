import React, { useEffect, useRef, useState } from "react";
import PokemonThumb from "./components/PokemonThumnail";
const Vader = ['grass','fire','water','bug','normal', ]

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const inputRef = useRef()
  const MikeyJ = (type) => {
    console.log('附值前',inputRef.current)
    inputRef.current = allPokemons
    console.log('附值後',inputRef.current)
    
    const twitter = allPokemons.filter((b) => {
      console.log(b.types[0].type.name);
      return b.types[0].type.name === type;
    });
    console.log(twitter);
    setAllPokemons(twitter);
  };
  const reset = () => {
    setAllPokemons(inputRef.current)
  }
  console.log('allPokemons',allPokemons)
  console.log('inputRef',inputRef.current)
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);
    console.log(data);
    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) =>
          [...currentList, data].sort((a, b) => a.id - b.id)
        );
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <button onClick={reset}>reset</button>
      <h1>Pokemon Evolution</h1>
      {Vader.map((item,i)=>{
        return(
          <button key={i} onClick={() =>MikeyJ(item)}>篩選{item}</button>
        )
      })}
      
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => {
            return (
              <React.Fragment key={index}>
                <PokemonThumb
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                />
                <div></div>
              </React.Fragment>
            );
          })}
        </div>
        <button className="load-more" onClick={getAllPokemons}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
