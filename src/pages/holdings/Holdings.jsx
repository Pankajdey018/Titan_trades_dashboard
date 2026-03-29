import React, { useEffect, useState } from "react";
import "./holdings.css";

import { fetchHoldings } from "../../services/holdingsService.js";
import HoldingsTable from "../holdings/HoldingsTable.jsx";
import { VerticalGraph } from "../../components/charts/VerticalGraph.jsx";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHoldings();
        setHoldings(data);
      } catch {
        setError("Failed to load holdings");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const labels = holdings.map((h) => h.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((h) => h.price),
        backgroundColor: "#1976d2",
      },
    ],
  };

  if (loading) return <p>Loading holdings...</p>;
  if (error) return <p>{error}</p>;

  const SummaryBox = ({ holdings }) => {
    const totalInvestment = holdings.reduce((acc, h) => acc + h.avg * h.qty, 0);

    const currentValue = holdings.reduce((acc, h) => acc + h.price * h.qty, 0);

    const pnl = currentValue - totalInvestment;
    const isProfit = pnl >= 0;

    return (
      <div className="summary-row">
        <div>
          <p>Total Investment</p>
          <h4>₹{totalInvestment.toFixed(2)}</h4>
        </div>

        <div>
          <p>Current Value</p>
          <h4>₹{currentValue.toFixed(2)}</h4>
        </div>

        <div>
          <p>P&L</p>
          <h4 className={isProfit ? "profit" : "loss"}>₹{pnl.toFixed(2)}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="holdings">
      <h2>Holdings ({holdings.length})</h2>

      <HoldingsTable data={holdings} />

      <div className="holdings-summary">
        <SummaryBox holdings={holdings} />
      </div>

      <VerticalGraph data={chartData} />
    </div>
  );
};

export default Holdings;
