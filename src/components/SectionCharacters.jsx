import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/Context";
import { CharacterCard } from "./CharacterCard";

export function SectionCharacters() {
  const { actions, store } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    actions.getCharacters(currentPage);
  }, [currentPage]);
  
  const handleNextPage = () =>{
    //se consulta si existe un valor dentro del campo next en la info del store
    if (store.infoCharacters.next){
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () =>{
    //se consulta si existe un valor dentro del campo previous dentor de la info del store 
    //y ademas si la actual pagina es superior a 1
    if (store.infoCharacters.previous && currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  };

  return (
    <>
      <h1 className="title-characters">Star Wars Characters</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.characters.length > 0 ? (
            store.characters.map((character) => {
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
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="pagination-controls mb-5">
        <button
          className="btn-pagination btn-prev"
          onClick={handlePreviousPage}
          disabled={!store.infoCharacters.previous}
        >
          Anterior
        </button>
        <span className="pagination-page-number">Página {currentPage}</span>
        <button
          className="btn-pagination btn-next"
          onClick={handleNextPage}
          disabled={!store.infoCharacters.next}
        >
          Siguiente
        </button>
      </div>
    </>
  );
}
