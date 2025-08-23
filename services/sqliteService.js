//functions to interact with the SQLite database for shopping lists
//function to get all shopping lists
export const getAllLists = async (db) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM lists');
        return result

    } catch (error) {
        console.error("Failed to get data", error);
    }
}
//function to add a new shopping list
export const addList = async (db, listName) => {
    try {
        const result = await db.runAsync('INSERT INTO lists (name) VALUES (?)', [listName]);
        return result;
    } catch (error) {
        console.error("Failed to add shopping list", error);
    }
}
//function to remove a shopping list by its ID
export const removeList = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM lists WHERE id = ?', [id]);
    } catch (error) {
        console.error("Failed to remove shopping list", error);
    }
}
//function to update a shopping list by its ID
export const updateList = async (db, id, newListName) => {
    try {
        await db.runAsync('UPDATE lists SET name = ? WHERE id = ?', [newListName, id]);
    } catch (error) {
        console.error("Failed to update shopping list", error);
    }
}
//function to get a shopping list by its ID
export const getListById = async (db, id) => {
    try {
        const result = await db.getFirstAsync('SELECT * FROM lists WHERE id = ?', [id]);
        console.log("Fetched list by id:", result);
        return result;
    } catch (error) {
        console.error("Failed to get shopping list by id", error);
    }
}

//functions to interact with the SQLite database for shopping list items
//function to get all items
export const getItemsByListId = async (db, listId) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM items WHERE listId = ?', [listId]);
        return result

    } catch (error) {
        console.error("Failed to get items", error);
    }
}
//function to add a new item
export const addItem = async (db, newItem) => {
    try {
        const result = await db.runAsync(
            'INSERT INTO items (name, listId, completed) VALUES (?, ?, ?)',
            [newItem.name, Number(newItem.listId), newItem.completed ? 1 : 0]
        );
        return result;
    } catch (error) {
        console.error("Failed to add item", error);
    }
}
// function to update an item
export const updateItem = async (db, updatedItem) => {
    try {
        await db.runAsync(
            'UPDATE items SET name = ?, completed = ? WHERE id = ?',
            [updatedItem.name, updatedItem.completed ? 1 : 0, Number(updatedItem.id)]
        );
    } catch (error) {
        console.error("Failed to update item", error);
    }
}
// function to remove an item by its ID
export const removeItem = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
    } catch (error) {
        console.error("Failed to remove item", error);
    }
}

// function to remove all items from a specific shopping list
export const removeAllItemsFromList = async (db, listId) => {
    try {
        await db.runAsync('DELETE FROM items WHERE listId = ?', [listId]);
    } catch (error) {
        console.error("Failed to remove all items from list", error);
    }
}