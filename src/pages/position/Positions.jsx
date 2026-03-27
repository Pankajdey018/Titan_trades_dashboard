import React, { useState, useMemo } from "react";
import "./positions.css";

import { positions as initialData } from "../../data/data.js";
import PositionsTable from "../position/PositionsTable.jsx";

const Positions = () => {
  const [filter, setFilter] = useState("ALL");

  const filteredPositions = useMemo(() => {
    return filter === "ALL"
      ? initialData
      : initialData.filter((p) => p.product === filter);
  }, [filter]);

  return (
    <div className="positions">
      <div className="positions-header">
        <h2>Positions</h2>
        <span>{filteredPositions.length} items</span>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          All
        </button>

        <button
          className={filter === "CNC" ? "active" : ""}
          onClick={() => setFilter("CNC")}
        >
          CNC
        </button>

        <button
          className={filter === "MIS" ? "active" : ""}
          onClick={() => setFilter("MIS")}
        >
          MIS
        </button>
      </div>

      <PositionsTable data={filteredPositions} />

      <PositionSummary data={filteredPositions} />
    </div>
  );
};

export default Positions;

// ✅ FIXED missing component
const PositionSummary = ({ data }) => {
  const totalPnl = data.reduce(
    (acc, p) => acc + (p.price - p.avg) * p.qty,
    0
  );

  const isProfit = totalPnl >= 0;

  return (
    <div className="positions-summary">
      <p>Total P&L</p>
      <h3 className={isProfit ? "profit" : "loss"}>
        ₹{totalPnl.toFixed(2)}
      </h3>
    </div>
  );
};