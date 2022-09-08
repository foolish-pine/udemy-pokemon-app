import { useEffect, useState } from "react";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";
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
