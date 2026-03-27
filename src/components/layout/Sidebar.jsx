import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

import {
  Dashboard,
  ListAlt,
  AccountBalance,
  ShowChart,
  AccountBalanceWallet,
  Apps,
} from "@mui/icons-material";

const menuItems = [
  { name: "Dashboard", path: "/", icon: <Dashboard /> },
  { name: "Orders", path: "/orders", icon: <ListAlt /> },
  { name: "Holdings", path: "/holdings", icon: <AccountBalance /> },
  { name: "Positions", path: "/positions", icon: <ShowChart /> },
  { name: "Funds", path: "/funds", icon: <AccountBalanceWallet /> },
  { name: "Apps", path: "/apps", icon: <Apps /> },
];

const Sidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">Zerodha</div>

      {/* Menu */}
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <div
        className="profile"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="avatar">ZU</div>
        <p>USERID</p>
      </div>

      {isProfileOpen && (
        <div className="dropdown">
          <p>Profile</p>
          <p>Logout</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;