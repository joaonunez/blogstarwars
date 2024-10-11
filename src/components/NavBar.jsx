import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { Context } from "../store/Context";
import StarWarsLogo from "../assets/images/Star_Wars_Logo.svg.png";

export function NavBar() {
  const { store, actions } = useContext(Context);

  const handleNotificationsClick = () => {
    actions.markNotificationsAsViewed();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={StarWarsLogo} alt="Star Wars Logo" width="120" />
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="nav-item dropdown position-relative" style={{ marginRight: "15px" }}>
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleNotificationsClick}
                style={{ cursor: 'pointer' }}
              >
                <FaBell size={20} />
                {store.unviewedNotifications > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">
                    {store.unviewedNotifications}
                  </span>
                )}
              </span>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ maxHeight: "600px", overflowY: "auto", width: "auto" }}
              >
                {store.notifications.length > 0 ? (
                  [...store.notifications].reverse().map((notification, index) => (
                    <li
                      key={index}
                      className={`p-3 d-flex align-items-center ${
                        notification.type === "remove" ? "bg-danger text-white" : ""
                      }`}
                    >
                      <img
                        src={notification.imageUrl}
                        alt={notification.message}
                        width="40"
                        className="me-2"
                      />
                      <span className="dropdown-item">{notification.message}</span>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item">No notifications</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
