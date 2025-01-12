//データベースの作成とCRUD操作の実装

import * as SQLite from 'expo-sqlite'


const db = await SQLite.openDatabaseAsync('app.db');

//データベースの初期化
export const initDatabase = async () => {
    try {
        //entriesテーブルとreferencesテーブルを作成
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS entries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                body TEXT
            );

            CREATE TABLE IF NOT EXISTS references(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                entry_id INTEGER,
                reference TEXT,
                FOREIGN KEY(entry_id) REFERENCES entries(id)
            );
        `)
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

//データの保存
export const onSaveData = async (title, body, references) => {
    try {
        //entriesテーブルにメモのタイトルと本文を挿入
        const entriesResult = await db.runAsync(
            'INSERT INTO entries (title, body) VALUES (?, ?);',
            [title, body]
        );

        //referencesテーブルに参考文献を挿入
        const entry_id = entriesResult.lastInsertRowId; //entriesテーブルのidを外部キーとして取得
        if (references.length > 0) {
            //runAsync()ではループで一度ずつ実行するため、ここではexecAsync()を利用
            await db.execAsync(references.map((reference) => {
                return (
                    'INSERT INTO references (entry_id, reference) VALUES(?, ?);',
                    [entry_id, reference]
                );
            }));
        }
    } catch (error) {
        console.error('Error saving entries and references:', error);
    }
}