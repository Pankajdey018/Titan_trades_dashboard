import React, { useContext } from "react";
import GeneralContext from "../../../context/GeneralContext";

import { Tooltip } from "@mui/material";
import { BarChartOutlined, DeleteOutline } from "@mui/icons-material";
import { createOrder } from "../../../services/ordersService";
import { removeFromWatchlist } from "../../../services/watchlistService";

const WatchListActions = ({ stock, onRemove }) => {
  const { openBuyWindow } = useContext(GeneralContext);

  const symbol = stock.symbol || stock.name;

  const handleSell = async () => {
    try {
      await createOrder({
        symbol,
        qty: 1,
        price: Number(stock.price || stock.ltp || 0),
        mode: "SELL",
      });
    } catch {
      // intentionally silent; parent screens can add toasts
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromWatchlist(symbol);
    } catch {
      // still remove locally for responsive UI
    }

    onRemove?.(symbol);
  };

  return (
    <div className="watchlist-actions">
      <Tooltip title="Buy">
        <button className="buy" onClick={() => openBuyWindow(symbol)}>
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell">
        <button className="sell" onClick={handleSell}>Sell</button>
      </Tooltip>

      <Tooltip title="Analytics">
        <button>
          <BarChartOutlined />
        </button>
      </Tooltip>

      <Tooltip title="Remove">
        <button onClick={handleRemove}>
          <DeleteOutline />
        </button>
      </Tooltip>
    </div>
  );
};

export default WatchListActions;
