import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/Context";
import { Link } from "react-router-dom";

export function CharacterProfile() {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCharacterById(id);
  }, [id, actions]);

  const character = store.selectedCharacter;

  if (!character) return <p>Cargando...</p>;
  const characterId = character.url
    .split("/") // Dividimos la URL en partes usando '/' como separador.
    .filter(Boolean) // Filtramos las partes que están vacías (esto elimina las cadenas vacías).
    .pop(); // Tomamos el último elemento del array, que es el ID del personaje.

  // Construimos la URL de la imagen usando el ID extraído.
  // La URL de la imagen sigue el formato "https://starwars-visualguide.com/assets/img/characters/{id}.jpg".
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  return (
    <>
      <div
        key={character.url} // SWAPI usa 'url' como identificador único.
        className="card"
        style={{ width: "30rem", margin: "0 auto" }}
      >
        {/* Verificamos que 'character.image' esté disponible */}
        <img
          src={imageUrl}
          className="card-img-top foto"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{character.name}</h5>
          <ul className="card-text list-data">
            <li>Especie: {character.species?.[0] || "Humano"}</li>
            <li>Género: {character.gender}</li>
            <li>Origen: {character.homeworld || "Desconocido"}</li>
            <li>Altura: {character.height} cm</li>
            <li>Peso: {character.mass} kg</li>
            <li>Color de Ojos: {character.eye_color}</li>
          </ul>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center container-button mt-3">
        <Link to={"/"}>
          <button className="btn btn-primary">Volver</button>
        </Link>
      </div>
    </>
  );
}
