//新規作成画面

import { Button } from "@rneui/themed";
import React from "react";
import {
    Keyboard, 
    KeyboardAvoidingView, 
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FieldList, ReferenceFieldList } from "./components/AddInputField";

//TODO ボタンを押すとデータを保存する
const onSave = () => {

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
                            <FieldList />
                            <ReferenceFieldList />
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
    saveButtonContainer: {
        margin: 10,
        borderRadius: 10
    },
    saveButtonStyle: {
        backgroundColor: '#66ccff'
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