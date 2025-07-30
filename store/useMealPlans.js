import { create } from 'zustand';
import { saveLocal, loadLocal } from '../storage/syncedStorage';

const STORAGE_KEY = 'mealPlans';

// Store for managing planned meals
const useMealPlans = create((set) => ({
  // Array of meal plan objects: { id, title, date }
  plans: [],
  addPlan: (plan) =>
    set((state) => {
      const plans = [...state.plans, plan];
      saveLocal(STORAGE_KEY, plans);
      return { plans };
    }),
  clearPlans: () => {
    saveLocal(STORAGE_KEY, []);
    set({ plans: [] });
  },
  loadPlans: async () => {
    const stored = await loadLocal(STORAGE_KEY);
    set({ plans: stored || [] });
  },
}));

export default useMealPlans;
