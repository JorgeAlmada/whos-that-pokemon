import "./App.css";
import Pokenames from "./utils/pokenames.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import PokeDiferences from "./Components/poke-diferences/poke-differences";
import { Container } from "react-bootstrap";

function App() {

  useEffect(() => {
      let x = Math.floor(Math.random() * 905 + 1);
      axios.get("https://pokeapi.co/api/v2/pokemon/" + x).then((response) => {
        assignPokemonInfo(response.data);
      });
  }, []);

  const dogPlay = () => {
    audioPlayer.current.play();
  };

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonCry, setPokemonCry] = useState("");
  const [pokemonGen, setPokemonGen] = useState("");
  const [firstType, setFirstType] = useState("");
  const [secondType, setSecondType] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [differenceList, setDifferenceList] = useState([]);
  const [selected, setSelected] = useState([]);
  const audioPlayer = useRef();

  const assignPokemonInfo = (pokemon) => {
    setPokemonName(pokemon.name);
    setPokemonCry(
      `https://play.pokemonshowdown.com/audio/cries/${pokemon.name}.mp3`
    );
    setPokemonGen(getPokemonGen(pokemon.id));
    setFirstType(pokemon.types[0].type.name);
    if (pokemon.types.length > 1) {
      setSecondType(pokemon.types[1].type.name);
    }
    setWeight(pokemon.weight);
    setHeight(pokemon.height);
  };

  const getPokemonGen = (pokemonNumber) => {
    if (pokemonNumber <= 151) {
      return 1;
    } else if (pokemonNumber <= 251) {
      return 2;
    } else if (pokemonNumber <= 386) {
      return 3;
    } else if (pokemonNumber <= 493) {
      return 4;
    } else if (pokemonNumber <= 649) {
      return 5;
    } else if (pokemonNumber <= 721) {
      return 6;
    } else if (pokemonNumber <= 809) {
      return 7;
    } else {
      return 8;
    }
  };

  const checkSelectedPokemon = (pokeName) => {
    setSelected([]);
    let pokeCompareData = {};
    if (pokeName !== undefined) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + pokeName)
        .then((response) => {
          const pokeCompare = response.data;
          pokeCompareData.generation = getPokemonGen(pokeCompare.id);
          pokeCompareData.firstType = pokeCompare.types[0].type.name;
          if (pokeCompare.types.length > 1) {
            pokeCompareData.secondType = pokeCompare.types[1].type.name;
          } else {
            pokeCompareData.secondType = "";
          }
          pokeCompareData.weight = pokeCompare.weight;
          pokeCompareData.height = pokeCompare.height;
        })
        .then(() => {
          const pokeDiffData = {
            pokeName: pokeName,
            genDiff:
              pokemonGen > pokeCompareData.generation
                ? "upper"
                : pokemonGen < pokeCompareData.generation
                ? "lower"
                : "same",
            firstTypeDiff:
              pokeCompareData.firstType === firstType
                ? "same"
                : pokeCompareData.firstType === secondType
                ? "otherSlot"
                : "notSame",
            secondTypeDiff:
              pokeCompareData.secondType === secondType
                ? "same"
                : pokeCompareData.secondType === firstType
                ? "otherSlot"
                : "notSame",
            weightDiff:
              weight > pokeCompareData.weight
                ? "upper"
                : weight < pokeCompareData.weight
                ? "lower"
                : "same",
            heightDiff:
              height > pokeCompareData.height
                ? "upper"
                : height < pokeCompareData.height
                ? "lower"
                : "same",
            typeData: pokeCompareData,
          };
          const currentDiff = differenceList;
          currentDiff.push(pokeDiffData);
          setDifferenceList([...currentDiff]);
        });
    }
    if (pokeName === pokemonName) {
      console.log("got it");
    }
  };

  return (
    <Container>
      <div className="App">
        <img className='w-25' src={`/images/whosthatpokemon.png`} alt="something" />
        <Typeahead
          id="typeAhead"
          onChange={(selected) => {
            checkSelectedPokemon(selected[0]);
          }}
          options={Pokenames}
          selected={selected}
        />
        {pokemonCry ? (
          <audio style={{ display: "none" }} ref={audioPlayer} controls>
            <source src={pokemonCry} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          ""
        )}
        <div className="d-flex fadeIn justify-content-center w-100">
          <div className="position-relative p-2 mt-2 mx-1 w-100">
            Generation
          </div>
          <div className="position-relative p-2 mt-2 mx-1 w-100">Type 1</div>
          <div className="position-relative p-2 mt-2 mx-1 w-100">Type 2</div>
          <div className="position-relative p-2 mt-2 mx-1 w-100">Weight</div>
          <div className="position-relative p-2 mt-2 mx-1 w-100">Height</div>
        </div>
        {differenceList.map((element, index) => {
          return (
            <PokeDiferences
              key={"diff-" + index}
              pokeName={element.pokeName}
              genDiff={element.genDiff}
              firstTypeDiff={element.firstTypeDiff}
              secondTypeDiff={element.secondTypeDiff}
              weightDiff={element.weightDiff}
              heightDiff={element.heightDiff}
              typeData={element.typeData}
            ></PokeDiferences>
          );
        })}
        <button onClick={dogPlay}></button>
      </div>
    </Container>
  );
}

export default App;
