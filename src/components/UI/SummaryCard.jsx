import React from "react";

const SummaryCard = ({ title, value, subtitle, extra, profit }) => {
  return (
    <div className="card">
      <p className="card-title">{title}</p>

      <h2 className={profit ? "profit" : ""}>
        {value} {extra && <small>{extra}</small>}
      </h2>

      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
};

export default SummaryCard;