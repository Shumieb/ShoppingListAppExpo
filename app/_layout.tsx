import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';

export default function RootLayout() {

  const createTablesIfNeeded = async (db: SQLiteDatabase) => {

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS lists
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS items
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listId INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
      );
    `)
  }

  return (
    <SQLiteProvider databaseName="shoppingList.db" onInit={createTablesIfNeeded}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />

      </Stack>
    </SQLiteProvider>
  )
}
