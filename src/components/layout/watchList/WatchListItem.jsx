import React, { useState } from "react";
import WatchListActions from "./WatchListActions";

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

const WatchListItem = ({ stock }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="watchlist-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="item-left">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>
      </div>

      <div className="item-right">
        <span>{stock.percent}</span>

        {stock.isDown ? (
          <KeyboardArrowDown className="down" />
        ) : (
          <KeyboardArrowUp className="up" />
        )}

        <span>₹{stock.price}</span>
      </div>

      {hover && <WatchListActions stock={stock} />}
    </li>
  );
};

export default WatchListItem;