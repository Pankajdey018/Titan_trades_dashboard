import React from "react";
import "./summary.css";

import SummaryCard from "../components/UI/SummaryCard.jsx";
import WatchList from "../components/layout/watchList/WatchList.jsx";

const Summary = () => {
  const equity = {
    margin: "3.74k",
    used: "0",
    opening: "3.74k",
  };

  const holdings = {
    pnl: "1.55k",
    percent: "+5.20%",
    current: "31.43k",
    investment: "29.88k",
  };

  return (
    <div className="summary">
      {/* Greeting */}
      <div className="summary-header">
        <h2>Hi, User 👋</h2>
      </div>

      {/* Cards */}
      <div className="summary-cards">
        <SummaryCard
          title="Equity"
          value={equity.margin}
          subtitle="Margin Available"
        />

        <SummaryCard
          title="Holdings"
          value={holdings.pnl}
          subtitle="P&L"
          extra={holdings.percent}
          profit
        />
      </div>

      {/* Details Section */}
      <div className="summary-details">
        <div className="details-box">
          <h4>Equity Details</h4>
          <p>Margins Used: {equity.used}</p>
          <p>Opening Balance: {equity.opening}</p>
        </div>

        <div className="details-box">
          <h4>Holdings Details</h4>
          <p>Current Value: {holdings.current}</p>
          <p>Investment: {holdings.investment}</p>
        </div>
      </div>

      {/* Watchlist */}
      <div className="summary-watchlist">
        <h3>Watchlist</h3>
        <WatchList />
      </div>
    </div>
  );
};

export default Summary;