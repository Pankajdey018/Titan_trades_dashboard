import React from "react";
import { Link } from "react-router-dom";
import "./funds.css";

// 💡 helper for INR formatting
const formatINR = (num) =>
  `₹ ${Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

const DataRow = ({ label, value, highlight }) => (
  <div className={`data-row ${highlight ? "highlight" : ""}`}>
    <span>{label}</span>
    <span>{formatINR(value)}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="card">
    <div className="card-header">{title}</div>
    <div className="card-body">{children}</div>
  </div>
);

const Funds = () => {
  return (
    <div className="funds-page">
      {/* 🔥 Top Banner */}
      <div className="funds-banner">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="actions">
          <Link className="btn primary">Add funds</Link>
          <Link className="btn secondary">Withdraw</Link>
        </div>
      </div>

      <div className="grid">
        {/* 💰 Equity Card */}
        <Section title="Equity">
          <DataRow label="Available margin" value={4043.1} highlight />
          <DataRow label="Used margin" value={3757.3} />
          <DataRow label="Available cash" value={4043.1} />

          <hr />

          <DataRow label="Opening balance" value={4043.1} />
          <DataRow label="Closing balance" value={3736.4} />
          <DataRow label="Payin" value={4064.0} />
          <DataRow label="SPAN" value={0} />
          <DataRow label="Delivery margin" value={0} />
          <DataRow label="Exposure" value={0} />
          <DataRow label="Options premium" value={0} />

          <hr />

          <DataRow label="Collateral (Liquid funds)" value={0} />
          <DataRow label="Collateral (Equity)" value={0} />
          <DataRow label="Total collateral" value={0} />
        </Section>

        {/* 📦 Commodity Card */}
        <div className="card empty-card">
          <p>You don't have a commodity account</p>
          <Link className="btn secondary">Open Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Funds;