import { create } from 'zustand';

// Store for managing planned meals
const useMealPlans = create((set) => ({
  // Array of meal plan objects: { id, title, date }
  plans: [],
  addPlan: (plan) =>
    set((state) => ({ plans: [...state.plans, plan] })),
  clearPlans: () => set({ plans: [] }),
}));

export default useMealPlans;
