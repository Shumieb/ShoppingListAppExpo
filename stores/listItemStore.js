import { create } from 'zustand';
import itemData from '../data/listItemData';

const useListItemStore = create((set) => ({
  items: itemData,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useListItemStore;