//新規作成画面

import { Input, ListItem } from "@rneui/themed";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
                            <TextInput
                                multiline
                                placeholder="タイトル"
                                style={styles.textLine}
                            />
                            <TextInput
                                multiline
                                placeholder="本文"
                                style={styles.textBox}
                            />
                            <TextInput
                                multiline
                                placeholder="URL"
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