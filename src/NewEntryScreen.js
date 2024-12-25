//新規作成画面

import { Input, ListItem } from "@rneui/themed";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function InputField({ placeholder, style }) {
    return(
        <TextInput
            multiline
            placeholder={placeholder}
            style={style}
        />
    )
}

const NewEntryScreen = () => {
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
                        >
                            <InputField
                                placeholder={"タイトル"}
                                style={styles.textLine}
                            />
                            <InputField
                                placeholder={"本文"}
                                style={styles.textBox}
                            />
                            <InputField
                                placeholder={"URL、書籍名など"}
                                style={styles.textLine}
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
    }
});

export default NewEntryScreen