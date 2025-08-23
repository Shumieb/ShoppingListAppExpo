import { addItem, getItemsByListId, removeAllItemsFromList, removeItem, updateItem } from '@/services/sqliteService';
import { create } from 'zustand';

const useListItemStore = create((set) => ({
  items: [],
  // Function to get all items
  getAllItems: () => useListItemStore.getState().items,
  // Function to get the count of items in a specific shopping list
  getItemCountByListId: (listId) => {
    return useListItemStore.getState().items.filter((item) => item.listId === listId).length;
  },
  // Function to add a new item to the list
  addNewItem: async (db, newItem) => {
    try {
      const addedList = await addItem(db, newItem);

      if (addedList) {
        addedList.id = addedList.lastInsertRowId;
        let itemToAdd = {
          id: addedList.id,
          name: newItem.name,
          listId: newItem.listId,
          completed: false
        }
        set((state) => ({
          items: [...state.items, itemToAdd]
        }))
      }

    } catch (error) {
      console.error('Failed to add new item:', error);
    }
  },
  // Function to remove an item by its ID
  removeListItem: async (db, id) => {
    try {
      await removeItem(db, Number(id));
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }))
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  },
  // Function to update an existing item    
  updateListItem: async (db, updatedItem) => {
    try {
      await updateItem(db, updatedItem);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === Number(updatedItem.id) ? updatedItem : item
        )
      }))
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  },
  // Function to get an item by its ID
  getItemById: (id) => {
    return useListItemStore.getState().items.find((item) => item.id === id);
  },
  // Function to get all items in a specific shopping list
  getItemsByShoppingListId: async (db, listId) => {
    try {
      let fetchedItems = await getItemsByListId(db, Number(listId));
      console.log(fetchedItems)
      if (fetchedItems) {
        set({ items: fetchedItems });
        return fetchedItems;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to get items by shopping list id", error);
    }
  },
  // Function to toggle the completion status of an item
  toggleItemCompleted: (id) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  })),
  // Function to remove all items from a certain shopping list
  deleteAllItemsFromList: async (db, id) => {
    try {
      await removeAllItemsFromList(db, Number(id));
      set((state) => ({
        items: state.items.filter((item) => item.listId !== Number(id))
      }))
      console.log("cleared list")
    } catch (error) {
      console.error('Failed to remove all items from list:', error);
    }
  },
}));

export default useListItemStore;