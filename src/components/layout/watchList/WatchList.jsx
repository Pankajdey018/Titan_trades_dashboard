import React, { useEffect, useState } from "react";
import "./WatchList.css";

import { watchlist as initialData } from "../../../data/data";
import WatchListItem from "./WatchListItem";
import { DoughnutChart } from "../../charts/DoughnoutChart";
import { fetchWatchlist } from "../../../services/watchlistService";

const WatchList = () => {
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(initialData);

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await fetchWatchlist();
        if (data.length > 0) setWatchlist(data);
      } catch {
        // keep local fallback data
      }
    };

    loadWatchlist();
  }, []);

  const filteredData = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: filteredData.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: filteredData.map((s) => s.price),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        borderWidth: 1,
      },
    ],
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
        <span>{filteredData.length}/50</span>
      </div>

      <ul className="watchlist-list">
        {filteredData.map((stock) => (
          <WatchListItem key={stock.name} stock={stock} />
        ))}
      </ul>

      <div className="watchlist-chart">
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default WatchList;
