// Stats.js
import React from "react";

// Utility function for currency formatting
const formatCurrency = (value) => {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const Stats = ({ stats, loading, error }) => {
  return (
    <div className="grid gap-8 my-8 md:grid-cols-3">
      {error && <div className="col-span-3 text-red-500">{error}</div>}
      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Available Balance</div>
          <div className="stat-value">
            {loading ? (
              <div className="spinner"></div> // Placeholder for a spinner or loading indicator
            ) : (
              formatCurrency(stats.availableBalance)
            )}
          </div>
        </div>
      </div>

      <div className="stats bg-secondary text-secondary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Pending Balance</div>
          <div className="stat-value">
            {loading ? (
              <div className="spinner"></div> // Placeholder for a spinner or loading indicator
            ) : (
              formatCurrency(stats.pendingBalance)
            )}
          </div>
        </div>
      </div>

      <div className="shadow stats bg-accent text-secondary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Total Purchases</div>
          <div className="stat-value">
            {loading ? (
              <div className="spinner"></div> // Placeholder for a spinner or loading indicator
            ) : (
              stats.totalCharges
            )}
          </div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Stats);
