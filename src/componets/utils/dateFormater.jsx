const formatDate = (isoString) => {
  if (!isoString) return 'No due date';

  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    weekday: 'short',    // "Sun"
    year: 'numeric',     // "2025"
    month: 'short',      // "Sep"
    day: 'numeric',      // "14"
    hour: 'numeric',     // "6"
    minute: 'numeric',   // "00"
    hour12: true,        // AM/PM
  });
};

export default formatDate