import React, { useContext } from "react";
import { Context } from "../store/Context";
import { CharacterCard } from "./CharacterCard";
import { BackButton } from "./button/BackButton";

export function SectionFavorites() {
  const { store } = useContext(Context);
  return (
    <>
      <h1 className="title-characters">Tus Favoritos</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.favorites.length > 0 ? (
            store.favorites.map((character) => {
              // Extraemos el ID del personaje a partir de la URL del recurso del personaje.
              // La propiedad 'character.url' es algo como "https://swapi.dev/api/people/1/".
              const characterId = character.url
                .split("/") // Dividimos la URL en partes usando '/' como separador.
                .filter(Boolean) // Filtramos las partes que están vacías (esto elimina las cadenas vacías).
                .pop(); // Tomamos el último elemento del array, que es el ID del personaje.

              // Construimos la URL de la imagen usando el ID extraído.
              // La URL de la imagen sigue el formato "https://starwars-visualguide.com/assets/img/characters/{id}.jpg".
              const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

              return (
                <CharacterCard
                  key={characterId}
                  id={characterId}
                  image={imageUrl}
                  name={character.name}
                  gender={character.gender}
                  birth_year={character.birth_year}
                  homeworld={character.homeworld}
                />
              );
            })
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center container-button mt-3">
        <BackButton/>
      </div>
    </>
  );
}
