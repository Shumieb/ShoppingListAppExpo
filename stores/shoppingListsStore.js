import { addList, getAllShoppingLists, removeList } from "@/services/sqliteService";
import { create } from 'zustand';

const useShoppingListStore = create((set) => ({
  shoppingLists: [],
  // Function to initialize the store with data from the database
  initializeShoppingLists: async (db) => {
    try {
      const storedLists = await getAllShoppingLists(db);
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
  addNewShoppingList: async (db, listName) => {
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
  removeShoppingList: async (db, id) => {
    try {
      await removeList(db, id);
      try {
        const storedLists = await getAllShoppingLists(db);
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
  updateShoppingList: (updatedList) => set((state) => ({
    shoppingLists: state.shoppingLists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    )
  })),
  // Function to get all shopping lists
  getAllShoppingLists: () => useShoppingListStore.getState().shoppingLists,
  // Function to get a shopping list by its ID
  getShoppingListById: (id) => {
    return useShoppingListStore.getState().shoppingLists.find((list) => list.id === Number(id));
  },
}));

export default useShoppingListStore;