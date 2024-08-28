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
      <h1 className="title-characters">Personajes De Star Wars</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.characters.length > 0 ? (
            store.characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                species={character.gender}
                gender={character.birth_year}
                origin={character.homeworld.name}
                
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
