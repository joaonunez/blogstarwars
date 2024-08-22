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

  return (
    <>
      <div
        key={character.id}
        className="card"
        style={{ width: "30rem", margin: "0 auto" }} // Centramos el card en la página
      >
        <img
          src={character.image}
          className="card-img-top foto"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{character.name}</h5>
          <ul className="card-text list-data">
            <li>Especie: {character.species}</li>
            <li>Género: {character.gender}</li>
            <li>Origen: {character.origin.name}</li>
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
