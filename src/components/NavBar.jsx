import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/Context";
import StarWarsLogo from "../assets/images/Star_Wars_Logo.svg.png";

export function NavBar() {
  const { store, actions } = useContext(Context);
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid justify-content-center ">
        <Link className="navbar-brand" to="/">
          <img src={StarWarsLogo} alt="" width="120" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item dropdown d-flex">
              <Link
                className="nav-link dropdown-toggle"
                to={"/favorites"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favoritos
              </Link>
              <ul className="dropdown-menu">
                { store.favorites.length > 0 ? (
                  store.favorites.map((fav, index) => (
                    <li key={index} className="d-flex align-items-center p-3">
                      <img src={fav.image} alt={fav.name} width="40" />
                      <span className="dropdown-item">{fav.name}</span>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => actions.removeFavorite(fav.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))
                ):(
                  <li>
                    <span className="dropdown-item">No hay favoritos</span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
