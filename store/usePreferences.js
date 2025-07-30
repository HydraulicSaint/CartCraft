import { create } from 'zustand';

// Store for core user preferences and inputs
const usePreferences = create((set) => ({
  // Number of people eating the meal
  numPeople: 1,
  // Maximum acceptable cook/prep time in minutes
  maxCookTime: 60,
  // Budget for the meal or grocery order
  budget: 0,
  // Dietary needs such as allergies or restrictions
  dietaryNeeds: '',
  // Ingredients or foods the user dislikes
  dislikes: '',
  // User's desired emotional outcome for the meal
  emotionalState: '',

  // Update functions
  setNumPeople: (num) => set({ numPeople: num }),
  setMaxCookTime: (time) => set({ maxCookTime: time }),
  setBudget: (amount) => set({ budget: amount }),
  setDietaryNeeds: (needs) => set({ dietaryNeeds: needs }),
  setDislikes: (items) => set({ dislikes: items }),
  setEmotionalState: (state) => set({ emotionalState: state }),

  // Reset all preferences back to defaults
  resetPreferences: () =>
    set({
      numPeople: 1,
      maxCookTime: 60,
      budget: 0,
      dietaryNeeds: '',
      dislikes: '',
      emotionalState: '',
    }),
}));

export default usePreferences;
