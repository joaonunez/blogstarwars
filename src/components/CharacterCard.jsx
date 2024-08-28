import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/Context";
import { useNavigate } from "react-router-dom";


export const CharacterCard = (props) =>{

    const {actions, store} = useContext(Context);
    const navigate = useNavigate();
    const isFavorite = store.favorites.some(fav => fav.id === props.id)

    const handleFavoriteClick = () =>{
      if(isFavorite){
        actions.removeFavorite(props.id);
    } else {
      actions.addFavorite(props.id)
    }
    }
    const handleViewProfile = () =>{
      navigate(`/character/${props.id}`) //navegar ala ruta del personaje
    }

    return(
        <div
        key={props.id}
        className="card card-character"
        style={{ width: "18rem" }}
      >
        <img src={props.image} className="card-img-top foto" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-center">{props.name}</h5>
            <ul className="card-text list-data">
                <li>{props.gender}</li>
                <li>{props.birth_year}</li>
                <li>{props.homeworld}</li>
            </ul>
            <div className="d-flex flex-row justify-content-center container-button">
            <button className="btn btn-eye" onClick={handleViewProfile}>
              <FontAwesomeIcon icon={faEye} />
            </button> 
            <button className="btn btn-heart" onClick={handleFavoriteClick} 
            style={{color: isFavorite ? "red" : "white"}}>
              <FontAwesomeIcon icon={faHeart} />
            </button> 
            </div>
        </div>
      </div>
    );
}