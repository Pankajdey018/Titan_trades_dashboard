import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { cancelOrder, fetchOrders } from "../services/ordersService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id) => {
    if (!id) return;

    try {
      await cancelOrder(id);
      await loadOrders();
    } catch {
      setError("Unable to cancel selected order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to="/dashboard" className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="orders-table-wrap">
          <h2>Orders ({orders.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const status = order.status || "OPEN";
                const cancellable = ["OPEN", "PENDING"].includes(String(status).toUpperCase());

                return (
                  <tr key={order.id || `${order.symbol}-${order.createdAt}`}>
                    <td>{order.symbol || order.name}</td>
                    <td>{order.side || order.mode}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td>{status}</td>
                    <td>
                      <button disabled={!cancellable} onClick={() => handleCancel(order.id)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
