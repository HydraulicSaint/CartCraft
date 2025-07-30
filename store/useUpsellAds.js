import { create } from 'zustand';
import { fetchUpsellAds } from '../advertising/adsApi';

const useUpsellAds = create((set) => ({
  ads: [],
  // Load ads related to a decision context
  loadAds: async (context) => {
    const ads = await fetchUpsellAds(context);
    set({ ads });
  },
  clearAds: () => set({ ads: [] }),
}));

export default useUpsellAds;
