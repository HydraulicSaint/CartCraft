import { create } from 'zustand';

const useStore = create(set => ({
  cart: [],
  user: null,
  cloudOptOut: false,
  setUser: user => set({ user }),
  setCloudOptOut: cloudOptOut => set({ cloudOptOut }),
  addToCart: item => set(state => ({ cart: [...state.cart, item] })),
  clearCart: () => set({ cart: [] })
}));

export default useStore;
