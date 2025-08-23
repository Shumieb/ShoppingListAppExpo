
export const getAllShoppingLists = async (db) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM lists');
        //console.log(result)
        return result

    } catch (error) {
        console.error("Failed to get data", error);
    }
}

export const addList = async (db, listName) => {
    try {
        const result = await db.runAsync('INSERT INTO lists (name) VALUES (?)', [listName]);
        return result;
    } catch (error) {
        console.error("Failed to add shopping list", error);
    }
}

export const removeList = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM lists WHERE id = ?', [id]);
    } catch (error) {
        console.error("Failed to remove shopping list", error);
    }
}