import React, { useEffect, useState } from "react";
import "./WatchList.css";

import { watchlist as initialData } from "../../../data/data";
import WatchListItem from "./WatchListItem";
import { DoughnutChart } from "../../charts/DoughnoutChart";
import { fetchWatchlist } from "../../../services/watchlistService";

const WatchList = () => {
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await fetchWatchlist();
        if (data.length > 0) setWatchlist(data);
      } catch {
        setError("Using offline watchlist fallback");
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, []);

  const filteredData = watchlist.filter((stock) =>
    (stock.name || stock.symbol || "").toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: filteredData.map((s) => s.name || s.symbol),
    datasets: [
      {
        label: "Price",
        data: filteredData.map((s) => Number(s.price || s.ltp || 0)),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        borderWidth: 1,
      },
    ],
  };

  const handleRemove = (symbol) => {
    setWatchlist((prev) => prev.filter((item) => (item.name || item.symbol) !== symbol));
  };

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>{filteredData.length}/{watchlist.length || 50}</span>
      </div>

      {loading && <p className="watchlist-note">Syncing watchlist...</p>}
      {error && <p className="watchlist-note">{error}</p>}

      <ul className="watchlist-list">
        {filteredData.map((stock, index) => (
          <WatchListItem
            key={`${stock.name || stock.symbol}-${index}`}
            stock={stock}
            onRemove={handleRemove}
          />
        ))}
      </ul>

      <div className="watchlist-chart">
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default WatchList;
