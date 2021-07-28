import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

const Navbar = () => {
  const currentUser = authService.getCurrentUser();
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white p-0 align-items-stretch">
      <Link
        className="navbar-brand col-2 d-flex align-items-center bg-dark text-white"
        to="/">
        CRM EXAMPLE
        <small className="ml-2"></small>
      </Link>

      <ul className="navbar-nav px-3 ml-auto">
        {currentUser && (
          <li className="nav-item">
            <div className="dropdown h-100">
              <button
                className="btn d-block h-100 p-0 d-flex align-items-center"
                type="button"
                id="profileDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <i className="far fa-user-circle fa-2x mr-2"></i>
                <b>{currentUser.name}</b>{" "}
                <i className="fas fa-angle-down ml-2"></i>
              </button>
              <div
                className="dropdown-menu border-0 bg-theme text-theme"
                aria-labelledby="profileDropdown">
                <button className="dropdown-item" onClick={authService.logout}>
                  <i className="fas fa-sign-out-alt mr-2 fa-sm"></i>Logout
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
