//入力フィールドの作成

import { useState } from "react";
import { TextInput, StyleSheet, View, Text, Button } from "react-native"

//入力フィールドの雛形
const InputField = ({ data }) => {
    return (
        <TextInput
            multiline
            placeholder={data.placeholder}
            style={data.style}
        />
    );
}

//タイトルと本文の入力フィールドを表示
export const FieldList = () => {
    const settingItems = [
        {
            id: 0,
            placeholder: "タイトル",
            style: styles.inputLine
        },
        {
            id: 1,
            placeholder: "本文",
            style: styles.inputBox
        },
    ]

    const titleAndTextField = settingItems.map((data) => {
        return (
            <View key={data.id}>
                <Text style={styles.text}>{data.placeholder}</Text>
                <InputField data={data} />
            </View>
        );
    });
    return titleAndTextField;
}

//参考文献リストを表示
export const ReferenceFieldList = () => {
    const referencePlaceholder = "URL、書籍名など";
    //参考文献リストの入力フォームをstateで管理
    const [reference, setReference] = useState([
        {
            id: Date.now(),
            placeholder: referencePlaceholder,
            style: styles.inputLine
        }
    ]);

    //参考文献フィールドを追加する
    const addReferenceField = () => {
        const newReference = {
            id: Date.now(),
            placeholder: referencePlaceholder,
            style: styles.inputLine
        };
        setReference([
            ...reference,
            newReference
        ]);
    };

    //参考文献フィールドを削除する
    const deleteReferenceField = ((id) => {
        setReference(
            reference.filter((field) => {
                return field.id !== id
            })
        );
    });

    //TODO 参考文献フィールドの上限を設定する。

    return (
        <View>
            <View style={styles.referenceHeader}>
                <Text style={styles.text}>参考文献</Text>
                <Button
                    title="+"
                    onPress={addReferenceField}
                />
            </View>
            {reference.map((field) => {
                return(
                    <View key={field.id} style={styles.inputContainer}>
                        <Button
                            title="-"
                            color="red"
                            onPress={() => deleteReferenceField(field.id)}
                        />
                        <InputField data={field} />
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    referenceHeader: {
        flexDirection: 'row',   //テキストとボタンを横並びに
    },
    inputContainer: {
        flexDirection: 'row',   //入力欄と削除ボタンを横並びに
        alignItems: 'center'
    },
    inputLine: {
        flex:1,
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
    },
    inputBox: {
        margin: 10,
        borderColor: 'silver',
        borderWidth: 1,
        fontSize: 16,
        maxHeight: 300
    },
    text: {
        fontSize: 18,
        margin: 10
    }
});