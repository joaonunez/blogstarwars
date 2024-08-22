import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/Context";

export function CharacterProfile() {
  const { id } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCharacterById(id);
  }, [id, actions]);

  const character = store.selectedCharacter;

  if (!character) return <p>Cargando...</p>;

  return (
    <div className="character-profile">
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p>Especie: {character.species}</p>
      <p>Género: {character.gender}</p>
      <p>Origen: {character.origin.name}</p>
      
    </div>
  );
}
