import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/Context";
import { useNavigate } from "react-router-dom";

export const CharacterCard = (props) => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  // Utilizar el id directamente desde props.
  const isFavorite = store.favorites.some(
    (fav) => fav.url.split("/").filter(Boolean).pop() === String(props.id)
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFavorite(props.id);
      console.log(`${props.name} removed from favorites`);
    } else {
      actions.addFavorite(props.id);
      console.log(`${props.name} added to favorites`);
    }
  };

  const handleViewProfile = () => {
    navigate(`/character/${props.id}`);
  };

  return (
    <div key={props.id} className="card card-character" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top foto" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title text-center">{props.name}</h5>
        <ul className="card-text list-data">
          <li><strong>Genero:</strong> {props.gender}</li>
          <li><strong>Cumpleaños:</strong> {props.birth_year}</li>
          <li><strong>Planeta:</strong> {props.homeworld}</li>
        </ul>
        <div className="d-flex flex-row justify-content-center container-button">
          <button className="btn btn-eye" onClick={handleViewProfile}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className="btn btn-heart"
            onClick={handleFavoriteClick}
            style={{ color: isFavorite ? "red" : "white" }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};
