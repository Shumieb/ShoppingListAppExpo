import listsData from '@/data/shoppingListsData';
import { create } from 'zustand';

const useShoppingListStore = create((set) => ({
  shoppingLists: listsData,
  // Function to add a new shopping list
  addNewShoppingList: (list) => set((state) => ({
    shoppingLists: [...state.shoppingLists, list]
  })),
  // Function to remove a shopping list by its ID
  removeShoppingList: (id) => set((state) => ({
    shoppingLists: state.shoppingLists.filter((list) => list.id !== id)
  })),
  // Function to update an existing shopping list
  updateShoppingList: (updatedList) => set((state) => ({
    shoppingLists: state.shoppingLists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    )
  })),
  // Function to get a shopping list by its ID
  getShoppingListById: (id) => {
    return useShoppingListStore.getState().shoppingLists.find((list) => list.id === id);
  },
}));

export default useShoppingListStore;