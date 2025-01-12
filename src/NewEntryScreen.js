//新規作成画面

import React from "react";
import {
    Keyboard, 
    KeyboardAvoidingView, 
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback } from "react-native";
import { Button } from "@rneui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddInputField from "./components/AddInputField";
import { onSaveData } from "./components/CRUDoperations";

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
                            <AddInputField />
                            <Button
                                title="保存する"
                                icon={styles.icon}
                                iconContainerStyle={styles.iconContainer}
                                containerStyle={styles.saveButtonContainer}
                                buttonStyle={styles.saveButtonStyle}
                                onPress={onSaveData}
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

export default NewEntryScreen;