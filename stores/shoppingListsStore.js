import listsData from '@/data/shoppingListsData';
import { create } from 'zustand';

const useShoppingListStore = create((set) => ({
  shoppingLists: listsData,
  addToShoppingList: (list) => set((state) => ({ shoppingLists: [...state.shoppingLists, list]})),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useShoppingListStore;