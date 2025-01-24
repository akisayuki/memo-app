//入力フィールドを追加

import { useState } from "react";
import FieldList from "./FieldList";
import ReferenceFieldList from "./ReferenceFieldList";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback } from "react-native";
import { Button } from "@rneui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//初期値を設定することで、編集と新規作成の両方に対応
const AddInputField = ({ initialParams = { title: '', body: '', reference: []}, onSubmit }) => {
    const [title, setTitle] = useState(initialParams.title);
    const [body, setBody] = useState(initialParams.body);
    const [reference, setReference] = useState([
        {
            id: Date.now(),
            value: initialParams.reference,
            placeholder: "URL、書籍名など",
            style: styles.inputLine
        }
    ]);

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                }}>
                    <KeyboardAvoidingView
                        behavior={"padding"}
                    >
                        <ScrollView
                            keyboardDismissMode="on-drag"
                        >
                            <FieldList
                                title={title}
                                setTitle={setTitle}
                                body={body}
                                setBody={setBody}
                            />
                            <ReferenceFieldList
                                reference={reference}
                                setReference={setReference}
                            />
                            <Button
                                title="保存する"
                                icon={styles.icon}
                                iconContainerStyle={styles.iconContainer}
                                containerStyle={styles.saveButtonContainer}
                                buttonStyle={styles.saveButtonStyle}
                                onPress={() => onSubmit(title, body, reference)}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputLine: {
        flex:1,
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
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

export default AddInputField;