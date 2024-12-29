//新規作成画面

import { Input, ListItem, Button } from "@rneui/themed";
import React, { useState } from "react";
import { 
    FlatList, 
    Keyboard, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback, 
    View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//入力フィールドを追加する
const InputField = ({ data }) => {
    return (
        <TextInput
            multiline
            placeholder={data.placeholder}
            style={data.style}
        />
    );
}

//TODO ボタンを押すとデータを保存する
const onSave = () => {

}

const NewEntryScreen = () => {
    //InputFieldの設定データ
    const settingItems = [
        {
            id: 0,
            placeholder: "タイトル",
            style: styles.textLine
        },
        {
            id: 1,
            placeholder: "本文",
            style: styles.textBox
        },
        {
            id: 2,
            placeholder: "URL、書籍名など",
            style: styles.textLine
        },
        {
            id: 3,
            placeholder: "URL、書籍名など",
            style: styles.textLine
        },
        {
            id: 4,
            placeholder: "URL、書籍名など",
            style: styles.textLine
        }
    ];

    //InputFiledの設定を配列settingItemsから取得
    const settings = settingItems.map((data) => {
        return (
            <InputField data={data} />
        );
    });

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                {/*欄外をタッチするとキーボードを隠す*/}
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <ScrollView 
                        keyboardDismissMode="on-drag"
                    >
                        <KeyboardAvoidingView
                            style={styles.container}
                            behavior={"position"}
                            keyboardVerticalOffset={100}
                            key={settings.id}
                        >
                            {settings}
                            <Button
                                title="保存する"
                                icon={styles.icon}
                                iconContainerStyle={styles.iconContainer}
                                containerStyle={styles.saveButtonContainer}
                                buttonStyle={styles.saveButtonStyle}
                                onPress={onSave}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textLine: {
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
    },
    textBox: {
        margin: 10,
        borderColor: 'silver',
        borderWidth: 1,
        fontSize: 16,
        maxHeight: 300
    },
    saveButtonContainer: {
        margin: 10,
        borderRadius: 10
    },
    saveButtonStyle: {
        backgroundColor: 'lightblue'
    },
    icon: {
        name: 'add',
        color: 'white'
    },
    iconContainer: {
        marginRight: 10
    }
});

export default NewEntryScreen