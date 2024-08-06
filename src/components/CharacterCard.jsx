import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
export const CharacterCard = (props) =>{
    return(
        <div
        key={props.id}
        className="card"
        style={{ width: "30rem" }}
      >
        <img src={props.image} className="card-img-top foto" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-center">{props.name}</h5>
            <ul className="card-text list-data">
                <li>{props.species}</li>
                <li>{props.gender}</li>
                <li>{props.origin}</li>
            </ul>
            <div className="d-flex flex-row justify-content-center container-button">
            <button className="btn btn-primary" >
              <FontAwesomeIcon icon={faEye} />
            </button> 
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faHeart} />
            </button> 
            </div>
        </div>
      </div>
    );
}