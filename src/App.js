import { useEffect, useState } from "react";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";
import "./App.css";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState("true");

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchAllPokemonData();
  }, []);

  const loadPokemon = (data) => {
    const _pokemoData = Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
  };

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました</h1>
      )}
    </div>
  );
}

export default App;
