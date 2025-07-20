import { create } from 'zustand';
import itemData from '../data/listItemData';

const useListItemStore = create((set) => ({
  items: itemData,
  // Function to add a new item to the list
  addNewItem: (item) => set((state) => ({ items: [...state.items, item] })),
  // Function to remove an item by its ID
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  // Function to update an existing item    
  updateItem: (updatedItem) => set((state) => ({
    items: state.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    )
  })),
  // Function to get an item by its ID
  getItemById: (id) => {
    return useListItemStore.getState().items.find((item) => item.id === id);
  },
  // Function to get all items in a specific shopping list
  getItemsByListId: (listId) => {
    return useListItemStore.getState().items.filter((item) => item.listId === listId);
  },
  // Function to get the total count of items in a specific shopping list
  getItemCountByListId: (listId) => {
    return useListItemStore.getState().items.filter((item) => item.listId === listId).length;
  },
}));

export default useListItemStore;