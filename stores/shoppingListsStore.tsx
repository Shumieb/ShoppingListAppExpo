import { addList, getAllLists, removeList, updateList } from '@/services/sqliteService';
import { ListType } from '@/util/entityTypes';
import { SQLiteDatabase } from 'expo-sqlite';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useShoppingListStore = create(
  combine(
    { shoppingLists: [] as ListType[] },

    (set) => ({

      // Function to initialize the store with data from the database
      initializeShoppingLists: async (db: SQLiteDatabase) => {
        try {
          const storedLists = await getAllLists(db);
          if (storedLists && storedLists.length > 0) {
            set({ shoppingLists: storedLists });
          } else {
            // If no data in the database, use the initial data
            set({ shoppingLists: [] });
          }
        } catch (error) {
          console.error('Failed to initialize shopping lists:', error);
        }
      },

      // Function to add a new shopping list
      addNewShoppingList: async (db: SQLiteDatabase, listName: string) => {
        try {
          const addedList = await addList(db, listName);

          if (addedList) {
            addedList.id = addedList.lastInsertRowId;
            set((state) => ({
              shoppingLists: [...state.shoppingLists, { id: addedList.id, name: listName }]
            }))
          }

        } catch (error) {
          console.error('Failed to add new shopping list:', error);
        }
      },

      // Function to remove a shopping list by its ID
      removeShoppingList: async (db: SQLiteDatabase, id: number) => {
        try {
          await removeList(db, id);

          try {
            const storedLists = await getAllLists(db);
            if (storedLists && storedLists.length > 0) {
              set({ shoppingLists: storedLists });
            } else {
              console.log("error in fetching updated lists after deletion")
            }
          } catch (error) {
            console.error('Failed to fetch updated shopping lists after deletion:', error);
          }

        } catch (error) {
          console.error('Failed to remove shopping list:', error);
        }
      },

      // Function to update an existing shopping list
      updateShoppingList: async (db: SQLiteDatabase, updatedList: ListType) => {
        try {
          await updateList(db, updatedList.id, updatedList.name);
          set((state: any) => ({
            shoppingLists: state.shoppingLists.map((list: ListType) =>
              list.id == updatedList.id ? updatedList : list
            )
          }))
        } catch (error) {
          console.error('Failed to update shopping list:', error);
        }
      },

      // Function to get all shopping lists
      getAllShoppingLists: () => useShoppingListStore.getState().shoppingLists,

      // Function to get a shopping list by its ID
      getShoppingListById: (id: number) => {
        return useShoppingListStore.getState().shoppingLists.find((list: ListType) => list.id === id);
      },

    })),
)

export default useShoppingListStore;