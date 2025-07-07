  // Helper function to format items string
  export const formatItems = (items, flavor) => {
    const parts = [];
    if (items.hookah > 0) {
      parts.push(`${items.hookah} Hookah Pot${items.hookah > 1 ? 's' : ''}`);
    }
    if (items.chillums > 0) {
      parts.push(`${items.chillums} Chillum${items.chillums > 1 ? 's' : ''}`);
    }
    if (items.coals > 0) {
      parts.push(`${items.coals} Coal${items.coals > 1 ? 's' : ''}`);
    }
    if (flavor && parts.length > 0) {
      parts.push(`${flavor} Flavor`);
    }
    return parts.length > 0 ? parts.join(", ") : "No items";
  };