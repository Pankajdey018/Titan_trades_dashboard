import React, { useContext } from "react";
import GeneralContext from "../../../context/GeneralContext";

import { Tooltip } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";

const WatchListActions = ({ stock }) => {
  const { openBuyWindow } = useContext(GeneralContext);

  return (
    <div className="watchlist-actions">
      <Tooltip title="Buy">
        <button className="buy" onClick={() => openBuyWindow(stock.name)}>
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell">
        <button className="sell">Sell</button>
      </Tooltip>

      <Tooltip title="Analytics">
        <button>
          <BarChartOutlined />
        </button>
      </Tooltip>

      <Tooltip title="More">
        <button>
          <MoreHoriz />
        </button>
      </Tooltip>
    </div>
  );
};

export default WatchListActions;