export function consolidateIngredients(meals = [], numPeople = 1) {
  const totals = {};
  meals.forEach((meal) => {
    if (!Array.isArray(meal.ingredients)) return;
    meal.ingredients.forEach((ing) => {
      if (!ing) return;
      let name;
      let qty = 1;
      let unit;

      if (typeof ing === 'string') {
        name = ing;
      } else if (typeof ing === 'object') {
        name = ing.name;
        qty = ing.quantity ?? 1;
        unit = ing.unit;
      }

      if (!name) return;

      const scaled = qty * numPeople;
      if (totals[name]) {
        totals[name].quantity += scaled;
      } else {
        totals[name] = { quantity: scaled, unit };
      }
    });
  });

  return Object.entries(totals).map(([name, info]) => ({
    name,
    quantity: info.quantity,
    unit: info.unit,
  }));
}
