import React, { useContext } from "react";
import { Context } from "../store/Context";
import { CharacterCard } from "./CharacterCard";

export function SectionFavorites() {
  const { store } = useContext(Context);
  return (
    <>
      <h1 className="title-characters">Tus Favoritos</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.favorites.length > 0 ? (
            store.favorites.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                gender={character.gender}
                origin={character.origin?.name || "Desconocido"}
              />
            ))
          ) : (
            <p>No hay personajes en favoritos.</p>
          )}
        </div>
      </div>
    </>
  );
}
