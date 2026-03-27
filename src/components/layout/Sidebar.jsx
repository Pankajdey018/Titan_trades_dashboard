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
  { name: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  { name: "Orders", path: "/dashboard/orders", icon: <ListAlt /> },
  { name: "Holdings", path: "/dashboard/holdings", icon: <AccountBalance /> },
  { name: "Positions", path: "/dashboard/positions", icon: <ShowChart /> },
  { name: "Funds", path: "/dashboard/funds", icon: <AccountBalanceWallet /> },
  { name: "Apps", path: "/dashboard/apps", icon: <Apps /> },
];

const Sidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">Titan Trades</div>

      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              end={item.path === "/dashboard"}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className="profile"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="avatar">TT</div>
        <p>TRADER01</p>
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
