import { useEffect, useState } from "react";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState("true");
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchAllPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemoData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemoData);
  };

  console.log(pokemonData);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}></Card>;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
