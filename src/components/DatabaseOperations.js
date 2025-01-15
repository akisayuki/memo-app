//データベースの作成とCRUD操作の実装

import * as SQLite from 'expo-sqlite'


//データベースの初期化
export const initDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('app.db');
        //PRAGMAの設定
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;
        `);
        //entriesテーブルとreference_listテーブルを作成
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS entries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                body TEXT
            );
        
            CREATE TABLE IF NOT EXISTS reference_list(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                entry_id INTEGER,
                reference TEXT,
                FOREIGN KEY(entry_id) REFERENCES entries(id)
            );
        `);
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

//データの保存
export const onSaveData = async (title, body, reference_list) => {
    try {
        const db = await SQLite.openDatabaseAsync('app.db');
        //entriesテーブルにメモのタイトルと本文を挿入
        const entriesResult = await db.runAsync(
            'INSERT INTO entries (title, body) VALUES (?, ?);',
            [title, body]
        );

        //reference_listテーブルに参考文献を挿入
        const entry_id = entriesResult.lastInsertRowId; //entriesテーブルのidを外部キーとして取得
        //参考文献データを1行ずつ挿入
        for (const reference of reference_list) {
            await db.runAsync(
                'INSERT INTO reference_list (entry_id, reference) VALUES(?, ?);',
                [entry_id, reference.value]
            );
        }

        console.log('Save successfully.');
    } catch (error) {
        console.error('Error saving entries and references:', error);
    }
}
/*
//データを取得する
export const getAllData = async () => {
    try {
        const entriesResult = await db.getAllAsync('SELECT * FROM entries;');
        const referencesResult = await db.getAllAsync('SELECT * FROM references;');

        //entriesにreferencesを紐づける(マッピング)
        const referencesMap = {};
        referencesResult.forEach((reference) => {
            //referencesMap[entry_id]が存在しない場合、空の配列を追加して初期化
            if (!referencesMap[reference.entry_id]) {
                referencesMap[reference.entry_id] = [];
            }
            referencesMap[reference.entry_id].push(reference.reference);
        });

        //各エントリーに対応する参考文献を追加する
        entriesResult.forEach((entry) => {
            //対応する値がない場合は、空の配列を追加する
            return entry.references = referencesMap[entry.id] || [];
        });

        return entriesResult;
    } catch (error) {
        console.error('Error retrieving entries and references:', error);
    }
}*/