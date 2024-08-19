import React, { useEffect, useContext } from "react";
import { Context } from "../store/Context";
import { CharacterCard } from "./CharacterCard";

export function SectionCharacters() {
  const { actions, store } = useContext(Context);
  useEffect(() => {
    actions.getCharacter();
  });
  return (
    <>
      <h1 className="title-characters">Personajes De Rick & Morty</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.characters.length > 0 ? (
            store.characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                gender={character.gender}
                origin={character.origin.name}
                
              />
            ))
          ) : (
            <p>No Hay Resultados.</p>
          )}
        </div>
      </div>
    </>
  );
}
