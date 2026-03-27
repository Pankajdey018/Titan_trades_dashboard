import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./funds.css";

import { addFunds, fetchFunds } from "../../services/fundsService";

const formatINR = (num) =>
  `₹ ${Number(num || 0).toLocaleString("en-IN", {
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

const defaultFunds = {
  availableMargin: 4043.1,
  usedMargin: 3757.3,
  availableCash: 4043.1,
  openingBalance: 4043.1,
  closingBalance: 3736.4,
  payin: 4064.0,
  span: 0,
  deliveryMargin: 0,
  exposure: 0,
  optionsPremium: 0,
  collateralLiquid: 0,
  collateralEquity: 0,
  totalCollateral: 0,
};

const Funds = () => {
  const [funds, setFunds] = useState(defaultFunds);

  useEffect(() => {
    const loadFunds = async () => {
      try {
        const data = await fetchFunds();
        setFunds((prev) => ({ ...prev, ...(data?.funds || data || {}) }));
      } catch {
        // keep default fallback
      }
    };

    loadFunds();
  }, []);

  const handleAddFunds = async () => {
    await addFunds({ amount: 1000 });
  };

  return (
    <div className="funds-page">
      <div className="funds-banner">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="actions">
          <Link className="btn primary" onClick={handleAddFunds}>
            Add funds
          </Link>
          <Link className="btn secondary">Withdraw</Link>
        </div>
      </div>

      <div className="grid">
        <Section title="Equity">
          <DataRow label="Available margin" value={funds.availableMargin} highlight />
          <DataRow label="Used margin" value={funds.usedMargin} />
          <DataRow label="Available cash" value={funds.availableCash} />

          <hr />

          <DataRow label="Opening balance" value={funds.openingBalance} />
          <DataRow label="Closing balance" value={funds.closingBalance} />
          <DataRow label="Payin" value={funds.payin} />
          <DataRow label="SPAN" value={funds.span} />
          <DataRow label="Delivery margin" value={funds.deliveryMargin} />
          <DataRow label="Exposure" value={funds.exposure} />
          <DataRow label="Options premium" value={funds.optionsPremium} />

          <hr />

          <DataRow label="Collateral (Liquid funds)" value={funds.collateralLiquid} />
          <DataRow label="Collateral (Equity)" value={funds.collateralEquity} />
          <DataRow label="Total collateral" value={funds.totalCollateral} />
        </Section>

        <div className="card empty-card">
          <p>You don't have a commodity account</p>
          <Link className="btn secondary">Open Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Funds;
