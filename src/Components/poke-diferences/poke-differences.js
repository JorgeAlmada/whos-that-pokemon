import { Fragment } from "react";

function PokeDiferences(props) {
  const firstCaps = (pokeName) => {
    const letterArray = pokeName.split("");
    letterArray[0] = letterArray[0].toUpperCase();
    return letterArray.join("");
  };

  return (
    <Fragment>
      <div>
        <p className="pokeFont fadeIn mt-2">{firstCaps(props.pokeName)}</p>
      </div>
      <div className="d-flex fadeIn justify-content-center w-100">
        <div className="position-relative card p-2 mt-2 mx-1 w-100 bg-transparent">
          <img
            src={`/images/ball-icons/${props.genDiff}.png`}
            alt="something"
          />
          <p className="pokeFont">{props.typeData.generation}</p>
        </div>
        <div className="position-relative card p-2 mt-2 mx-1 w-100 bg-transparent">
          <img
            src={`/images/ball-icons/${props.firstTypeDiff}.png`}
            alt="something"
          />
          <p className="pokeFont">{firstCaps(props.typeData.firstType)}</p>
        </div>
        <div className="position-relative card p-2 mt-2 mx-1 w-100 bg-transparent">
          <img
            src={`/images/ball-icons/${props.secondTypeDiff}.png`}
            alt="something"
          />
          <p className="pokeFont">
            {props.typeData.secondType
              ? firstCaps(props.typeData.secondType)
              : "-"}
          </p>
        </div>
        <div className="position-relative card p-2 mt-2 mx-1 w-100 bg-transparent">
          <img
            src={`/images/ball-icons/${props.weightDiff}.png`}
            alt="something"
          />
          <p className="pokeFont">{props.typeData.weight}</p>
        </div>
        <div className="position-relative card p-2 mt-2 mx-1 w-100 bg-transparent">
          <img
            src={`/images/ball-icons/${props.heightDiff}.png`}
            alt="something"
          />
          <p className="pokeFont">{props.typeData.height}</p>
        </div>
        {/* <p>{props.genDiff}</p>
        <p>{props.firstTypeDiff}</p>
        <p>{props.secondTypeDiff}</p>
        <p>{props.weightDiff}</p>
        <p>{props.heightDiff}</p> */}
      </div>
    </Fragment>
  );
}

export default PokeDiferences;
