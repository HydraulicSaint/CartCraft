import { create } from 'zustand';
import { saveLocal, loadLocal } from '../storage/syncedStorage';

const STORAGE_KEY = 'pantryItems';

const usePantry = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const items = [...state.items, item];
      saveLocal(STORAGE_KEY, items);
      return { items };
    }),
  removeItem: (index) =>
    set((state) => {
      const items = state.items.filter((_, i) => i !== index);
      saveLocal(STORAGE_KEY, items);
      return { items };
    }),
  clearItems: () => {
    saveLocal(STORAGE_KEY, []);
    set({ items: [] });
  },
  loadItems: async () => {
    const stored = await loadLocal(STORAGE_KEY);
    set({ items: stored || [] });
  },
}));

export default usePantry;
