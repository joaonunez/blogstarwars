import React, { useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { CharacterCard } from "./CharacterCard";
import imagenpredeterminada from "../assets/images/imagen-predeterminada.jpg"
export function SectionCharacters() {
  const { actions, store } = useContext(Context);
  useEffect(() => {
    actions.getCharacter();
  });
  return (
    <>
      <h1 className="title-characters">Personajes De Star Wars</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.characters.length > 0 ? (
            store.characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                image={imagenpredeterminada}
                name={character.name}
                gender={character.gender}
                birth_year={character.birth_year}
                homeworld={character.homeworld}
                
              />
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </>
  );
}
