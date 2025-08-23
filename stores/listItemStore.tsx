import { addItem, getItemsByListId, removeAllItemsFromList, removeItem, updateItem } from '@/services/sqliteService';
import { ItemType } from '@/util/entityTypes';
import { SQLiteDatabase } from 'expo-sqlite';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useListItemStore = create(
  combine(
    { items: [] as ItemType[] },

    (set) => ({

      // Function to add a new item to the list
      addNewItem: async (db: SQLiteDatabase, newItem: ItemType) => {
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
      removeListItem: async (db: SQLiteDatabase, id: number) => {
        try {
          await removeItem(db, Number(id));
          set((state) => ({ items: state.items.filter((item: ItemType) => item.id !== id) }))
        } catch (error) {
          console.error('Failed to remove item:', error);
        }
      },

      // Function to update an existing item    
      updateListItem: async (db: SQLiteDatabase, updatedItem: ItemType) => {
        try {
          await updateItem(db, updatedItem);
          set((state) => ({
            items: state.items.map((item: ItemType) =>
              item.id === updatedItem.id ? updatedItem : item
            )
          }))
        } catch (error) {
          console.error('Failed to update item:', error);
        }
      },

      // Function to get an item by its ID
      getItemById: (id: number) => {
        return useListItemStore.getState().items.find((item: ItemType) => item.id === id);
      },

      // Function to get all items in a specific shopping list
      getItemsByShoppingListId: async (db: SQLiteDatabase, listId: number) => {
        try {
          let fetchedItems = await getItemsByListId(db, listId);
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
      toggleItemCompleted: async (db: SQLiteDatabase, id: number, item: ItemType) => {
        let completedBool = item.completed ? true : false
        await updateItem(db, { ...item, completed: !completedBool });
        set((state) => ({
          items: state.items.map((item: ItemType) =>
            item.id === id ? { ...item, completed: !completedBool } : item
          )
        }))
      },

      // Function to remove all items from a certain shopping list
      deleteAllItemsFromList: async (db: SQLiteDatabase, id: number) => {
        try {
          await removeAllItemsFromList(db, Number(id));
          set((state) => ({
            items: state.items.filter((item: ItemType) => item.listId !== id)
          }))
        } catch (error) {
          console.error('Failed to remove all items from list:', error);
        }
      },

    })),
)

export default useListItemStore;