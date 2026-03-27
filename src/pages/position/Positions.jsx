import React, { useEffect, useMemo, useState } from "react";
import "./positions.css";

import PositionsTable from "../position/PositionsTable.jsx";
import { fetchPositions } from "../../services/positionsService.js";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPositions();
        setPositions(data);
      } catch {
        setError("Failed to load positions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredPositions = useMemo(() => {
    return filter === "ALL"
      ? positions
      : positions.filter((p) => p.product === filter);
  }, [filter, positions]);

  if (loading) return <p>Loading positions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="positions">
      <div className="positions-header">
        <h2>Positions</h2>
        <span>{filteredPositions.length} items</span>
      </div>

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

const PositionSummary = ({ data }) => {
  const totalPnl = data.reduce((acc, p) => acc + (p.price - p.avg) * p.qty, 0);

  const isProfit = totalPnl >= 0;

  return (
    <div className="positions-summary">
      <p>Total P&L</p>
      <h3 className={isProfit ? "profit" : "loss"}>₹{totalPnl.toFixed(2)}</h3>
    </div>
  );
};
