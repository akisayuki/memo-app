//データベースの作成とCRUD操作の実装

import * as SQLite from 'expo-sqlite'


const db = await SQLite.openDatabaseAsync('app.db');

//データベースの初期化
const initDatabase = async () => {
    try {
        //entriesテーブルとreferencesテーブルを作成
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXIST entries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                body TEXT
            );

            CREATE TABLE IF NOT EXIST references(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                entry_id INTEGER,
                reference TEXT,
                FOREIGN KEY(entry_id) REFERENCES entries(id)
            );
        `)
    } catch (error) {
        console.log('Error initializing database:', error);
    }
}

