import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../store/Context";
import { useNavigate } from "react-router-dom";

export const FilmCard = (props) => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();


  

  const handleViewProfile = () => {
    navigate(`/film/${props.id}`);
  };

  return (
    <div key={props.id} className="card card-film" style={{ width: "18rem" }}>
      <img src={props.image} className="card-img-top foto" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title text-center">{props.title}</h5>
        <ul className="card-text list-data">
          <li><strong>Director:</strong> {props.director}</li>
          <li><strong>Release date:</strong> {props.release_date}</li>
        </ul>
        <div className="d-flex flex-row justify-content-center container-button">
          <button className="btn btn-eye" onClick={handleViewProfile}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          
        </div>
      </div>
    </div>
  );
};
