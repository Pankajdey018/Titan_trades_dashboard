import React, { useEffect, useState } from "react";
import "./layout.css";

const TopBar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTime(formattedTime);
    };

    updateTime(); // initial call

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="topbar">
      {/* 📈 Market Indicators */}
      <div className="market">
        <div className="market-item">
          <span className="market-name">NIFTY 50</span>
          <span className="market-value positive">+100.2</span>
        </div>

        <div className="market-item">
          <span className="market-name">SENSEX</span>
          <span className="market-value positive">+100.2</span>
        </div>
      </div>

      {/* 🔍 Search */}
      <div className="search-box">
        <input placeholder="Search stocks, ETFs..." />
      </div>

      {/* 👤 Right Section */}
      <div className="topbar-right">
        <span className="time">{time}</span>

        <div className="icon">🔔</div>
        <div className="icon">⚙️</div>

        <div className="profile">
          <div className="avatar">ZU</div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;