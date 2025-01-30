//データベースの作成とCRUD操作の実装

import * as SQLite from 'expo-sqlite'

const DEVELOPMENT_MODE = true;
//データベースのリセット
//TODO リリース時には必ず消すこと
export const resetDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('app.db');
        db.execAsync(`
            DROP TABLE IF EXISTS entries;
            DROP TABLE IF EXISTS reference_list;
        `);
        console.log('Database reset successfully.');
    } catch (error) {
        console.error('Database reset failed:', error);
    }
}

//データベースの初期化
export const initDatabase = async () => {
    if (DEVELOPMENT_MODE) {
        await resetDatabase();
    }
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
                title TEXT NOT NULL,
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

//データを編集する
export const updateData = async (entriesId, title, body, reference_list) => {
    try {
        const db = await SQLite.openDatabaseAsync('app.db');
        
        /*
        reference_listテーブルのreferenceを、entry_idとidを取得して更新
        reference.idが存在しない、すなわち新しくデータを追加する場合とで条件分岐
        */
        for (const reference of reference_list) {
            /*
            削除フラグ(isDeleted)が立っている場合はデータを削除
            新規作成フラグ(isNew)が立っている場合はデータを挿入
            */
            if (reference.isDeleted) {
                await db.runAsync(
                    'DELETE FROM reference_list WHERE entry_id = ? AND id = ?;',
                    [entriesId, reference.id]
                );
                console.log(`Deleted reference: entry_id=${entriesId}, id=${reference.id}`);
                
            } else if (reference.isNew) {
                await db.runAsync(
                    'INSERT INTO reference_list (entry_id, reference) VALUES(?, ?);',
                    [entriesId, reference.value]
                );
            } else {
                await db.runAsync(
                    'UPDATE reference_list SET reference = ? WHERE entry_id = ? AND id = ?;',
                    [reference.value, entriesId, reference.id]
                );
            }
            
        }
        //entiresテーブルのtitleとbodyを、idを取得して更新
        await db.runAsync(
            'UPDATE entries SET title = ?, body = ? WHERE id = ?;',
            [title, body, entriesId]
        );

        //更新されたデータを取得
        const getEntriesResult = await db.getFirstAsync('SELECT * FROM entries WHERE id = ?;', [entriesId]);
        const getReferenceResult = await db.getAllAsync('SELECT * FROM reference_list WHERE entry_id = ?;', [entriesId]);
        return (
            {
                ...getEntriesResult,
                reference: getReferenceResult
            }
        );
    } catch (error) {
        console.error('Failed to update entries or reference_list:', error);
    }
}

//データを取得する
export const getAllData = async () => {
    try {
        db = await SQLite.openDatabaseAsync('app.db');

        //entriesテーブルとreference_listテーブルからデータを取得
        const entriesResult = await db.getAllAsync('SELECT * FROM entries;');
        const referenceListResult = await db.getAllAsync('SELECT * FROM reference_list;');
        
        //entry_idにreference_listの要素を割り当てる
        const referencesMap = {};
        referenceListResult.forEach((reference) => {
            //referencesMap[entry_id]が存在しない場合、空の配列を追加して初期化
            if (!referencesMap[reference.entry_id]) {
                referencesMap[reference.entry_id] = [];
            }
            //referenceMapに、それぞれのreferenceのidと内容を追加する
            referencesMap[reference.entry_id].push({
                id: reference.id,
                text: reference.reference
            });
        });

        //entriesにreferencesを紐づける
        const result = entriesResult.map((entry) => {
            return (
                {
                    ...entry,
                    reference: referencesMap[entry.id] || []    //referenceMapにデータが存在しない場合、空の配列を紐付け
                }
            );
        });
        
        return result;
    } catch (error) {
        console.error('Error retrieving entries and references:', error);
    }
}

//メモ(レコード)を削除する
export const deleteRecord = async (entryId) => {
    try {
        const db = await SQLite.openDatabaseAsync('app.db');

        //対応するentriesテーブルとreference_listテーブルを、idをキーにして削除
        //entiresテーブルを先に削除すると、reference_listが参照する外部キーが消滅するため、reference_listテーブルを先に削除する
        await db.runAsync(
            'DELETE FROM reference_list WHERE entry_id = ?;',
            [entryId]
        );
        await db.runAsync(
            'DELETE FROM entries WHERE id = ?;',
            [entryId]
        );

        console.log('Delete successfully.');
        
    } catch (error) {
        console.error('Failed to delete data:', error);
    }
}