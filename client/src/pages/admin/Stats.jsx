import { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState({
    availableBalance: 0,
    pendingBalance: 0,
    totalCharges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stripe/api/stats`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setStats(data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch stats:", error);

        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (value) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="grid gap-8 my-8 md:grid-cols-3">
      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Available Balance</div>
          <div className="stat-value">
            {loading ? "Loading..." : formatCurrency(stats.availableBalance)}
          </div>
        </div>
      </div>

      <div className="stats bg-secondary text-secondary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Pending Balance</div>
          <div className="stat-value">
            {loading ? "Loading..." : formatCurrency(stats.pendingBalance)}
          </div>
        </div>
      </div>

      <div className="shadow stats bg-accent text-secondary-content">
        <div className="stat">
          <div className="stat-title text-base-100">Total Purchases</div>
          <div className="stat-value">
            {loading ? "Loading..." : stats.totalCharges}
          </div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
