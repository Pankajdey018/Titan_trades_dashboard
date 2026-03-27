import React from "react";

const HoldingsRow = ({ stock }) => {
  const curValue = stock.price * stock.qty;
  const pnl = curValue - stock.avg * stock.qty;

  const isProfit = pnl >= 0;

  return (
    <tr>
      <td>{stock.name}</td>
      <td>{stock.qty}</td>
      <td>₹{stock.avg.toFixed(2)}</td>
      <td>₹{stock.price.toFixed(2)}</td>
      <td>₹{curValue.toFixed(2)}</td>

      <td className={isProfit ? "profit" : "loss"}>
        ₹{pnl.toFixed(2)}
      </td>

      <td className={isProfit ? "profit" : "loss"}>
        {stock.net}
      </td>

      <td className={stock.isLoss ? "loss" : "profit"}>
        {stock.day}
      </td>
    </tr>
  );
};

export default HoldingsRow;