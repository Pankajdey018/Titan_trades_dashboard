import React, { useEffect, useState } from "react";
import "./layout.css";

import { searchStocks } from "../../services/stocksService";

const TopBar = () => {
  const [time, setTime] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) return;

    const timer = setTimeout(async () => {
      try {
        const response = await searchStocks(query.trim());
        const list = Array.isArray(response)
          ? response
          : response?.results || response?.stocks || response?.data || [];
        setResults(list.slice(0, 6));
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="topbar">
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

      <div className="search-box">
        <input
          placeholder="Search stocks, ETFs..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.trim().length < 2) setResults([]);
          }}
        />

        {results.length > 0 && (
          <div className="search-results">
            {results.map((item, idx) => {
              const symbol = item.symbol || item.ticker || item.name || `STOCK-${idx}`;
              const name = item.name || item.companyName || symbol;

              return (
                <button
                  type="button"
                  key={`${symbol}-${idx}`}
                  className="search-result-item"
                  onClick={() => setQuery(symbol)}
                >
                  <strong>{symbol}</strong>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

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
