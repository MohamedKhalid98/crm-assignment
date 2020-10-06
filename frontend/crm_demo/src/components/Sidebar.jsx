import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth.service";
const Sidebar = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <aside className="sidebar">
      <ul className="list-unstyled bg-dark shadow h-100">
        <li>
          <NavLink to="/leads">
            <i className="fas fa-bullseye"></i>
            Leads
          </NavLink>
          {currentUser.role === "admin" && (
            <NavLink to="/users">
              <i className="fas fa-users-cog"></i>
              Users Management
            </NavLink>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
