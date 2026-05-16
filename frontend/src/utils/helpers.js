// Format a number as KES currency
// formatCurrency(5000) → "KES 5,000.00"
export const formatCurrency = (amount, currency = "KES") =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(amount);

// Format ISO date into readable string
// formatDate("2025-05-12") → "12 May 2025"
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-KE", {
    day: "2-digit", month: "short", year: "numeric",
  });

// Group array of transactions by month label
// Used by Member 4 (Reports) to build charts
export const groupByMonth = (items) =>
  items.reduce((acc, item) => {
    const key = new Date(item.date).toLocaleDateString("en-KE", {
      month: "short", year: "numeric",
    });
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});

// Get last N months as label strings for chart X-axis
// getLastNMonths(3) → ["Mar 2025", "Apr 2025", "May 2025"]
export const getLastNMonths = (n = 6) => {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(
      now.getFullYear(), now.getMonth() - (n - 1 - i), 1
    );
    return d.toLocaleDateString("en-KE", {
      month: "short", year: "numeric",
    });
  });
};