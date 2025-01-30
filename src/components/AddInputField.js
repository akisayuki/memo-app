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

/*
初期値を設定することで、編集と新規作成の両画面に対応
親からpropsとしてデータと保存関数を受け取る
*/
const AddInputField = ({ initialData, onSave }) => {
    /*
    reference配列の整形
    stateで管理し、再レンダリングを防ぐ
    refに渡されるのは参考文献リストの配列(formData.reference)の中身(id, text)
    */
    const [formData, setFormData] = useState(() => {
        return (
            {
                ...initialData,
                reference: initialData.reference.map((ref) => {
                    return (
                        {
                            id: ref.id, //inputDataから渡されたid
                            value: ref.text,    //inputDataから渡されたtext
                            placeholder: 'URL、書籍名など',
                            style: styles.inputLine
                        }
                    );
                })
            }
        );
    });

    //参考文献リストの入力変更を操作するイベントハンドラ
    const handleInputReferenceChange = (newReference) => {
        //newReferenceに関数が渡されているときは、関数を実行
        if (typeof newReference === 'function') {
            setFormData((prev) => {
                return (
                    {
                        ...prev,
                        reference: newReference(prev.reference)
                    }
                );
            });
        } else {
            setFormData((prev) => {
                return (
                    {
                        ...prev,
                        reference: newReference
                    }
                )
            })
        }
    };

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
                                title={formData.title}
                                setTitle={(newTitle) =>
                                    setFormData((prev) => 
                                        ({ ...prev, title: newTitle }))}
                                body={formData.body}
                                setBody={(newBody) =>
                                    setFormData((prev) =>
                                        ({ ...prev, body: newBody }))
                                }
                            />
                            <ReferenceFieldList
                                reference={formData.reference}
                                setReference={handleInputReferenceChange}
                            />
                            <Button
                                title="保存する"
                                icon={styles.icon}
                                iconContainerStyle={styles.iconContainer}
                                containerStyle={styles.saveButtonContainer}
                                buttonStyle={styles.saveButtonStyle}
                                onPress={() => onSave(formData)}
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