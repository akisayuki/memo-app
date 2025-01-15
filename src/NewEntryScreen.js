//新規作成画面

import React from "react";
import {
    Keyboard, 
    KeyboardAvoidingView, 
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AddInputField from "./components/AddInputField";

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
    }
});

export default NewEntryScreen;