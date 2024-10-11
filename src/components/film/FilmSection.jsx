import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/Context";
import { FilmCard } from "./FilmCard";
export function FilmSection() {
  const { actions, store } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    actions.getFilms(currentPage);
  }, [currentPage]);
  
  return (
    <>
      <h1 className="title-characters">Star Wars Films</h1>
      <div className="container-full-character">
        <div className="character-container col-xxl-10">
          {store.films.length > 0 ? (
            store.films.map((film) => {
              // Extraemos el ID del personaje a partir de la URL del recurso del personaje.
              // La propiedad 'character.url' es algo como "https://swapi.dev/api/people/1/".
              const filmId = film.url
                .split("/") // Dividimos la URL en partes usando '/' como separador.
                .filter(Boolean) // Filtramos las partes que están vacías (esto elimina las cadenas vacías).
                .pop(); // Tomamos el último elemento del array, que es el ID del personaje.

              // Construimos la URL de la imagen usando el ID extraído.
              // La URL de la imagen sigue el formato "https://starwars-visualguide.com/assets/img/characters/{id}.jpg".
              const imageUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;

              return (
                <FilmCard
                  key={filmId}
                  id={filmId}
                  image={imageUrl}
                  title={film.title}
                  director={film.director}
                  release_date={film.release_date}
                />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
