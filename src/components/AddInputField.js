//入力フィールドを追加

import { useRef, useState } from "react";
import FieldList from "./FieldList";
import ReferenceFieldList from "./ReferenceFieldList";
import {
    Alert,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback } from "react-native";
import { Button } from "@rneui/themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, usePreventRemove } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/*
初期値を設定することで、編集と新規作成の両画面に対応
propsとしてデータと保存関数を受け取る
*/
const AddInputField = ({ initialData, onSave }) => {
    /*
    reference配列の整形
    stateで管理し、再レンダリングを防ぐ
    refに渡されるのは参考文献リストの配列(formData.reference)の中身(id, reference)
    */
    const [formData, setFormData] = useState(() => {
        return (
            {
                ...initialData,
                reference: initialData.reference.map((ref) => {
                    return (
                        {
                            id: ref.id, //inputDataから渡されたid
                            value: ref.reference,    //inputDataから渡されたreference
                            placeholder: 'URL、書籍名など',
                            style: styles.inputLine
                        }
                    );
                })
            }
        );
    });

    //保存状態(内容の変更)を監視するstate
    const [isUnsaved, setIsUnsaved] = useState(false);
    const navigation = useNavigation();
    const scrollPositionRef = useRef(null);

    //渡されたyの値を元に、特定位置にスクロール
    const handleFocus = (y) => {
        scrollPositionRef.current.scrollToPosition(0, y - 200, true);
    }

    //入力を保存する前に画面遷移を行うと、確認アラートを表示
    //TODO 一度キャンセルを押すとボタンのUIが押されたままの状態になるのを改善する
    usePreventRemove(isUnsaved, ({ data }) => {
        Alert.alert(
            '変更が保存されていません',
            '入力を破棄します。よろしいですか？',
            [
                {
                    text: 'キャンセル',
                    style: 'cancel',
                    onPress: () => {}
                },
                {
                    text: '破棄',
                    style: 'destructive',
                    onPress: () => navigation.dispatch(data.action)
                }
            ]
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
            setIsUnsaved(true); //内容の変更を管理
        } else {
            setFormData((prev) => {
                return (
                    {
                        ...prev,
                        reference: newReference
                    }
                );
            });
            setIsUnsaved(true);
        }
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback
                    //画面のどこかをタッチすることでキーボードを閉じ、余計なスクロールを防ぐ
                    onPress={Keyboard.dismiss}
                >
                    <KeyboardAwareScrollView
                        ref={scrollPositionRef}
                        contentContainerStyle={styles.scrollViewContainer}
                        extraScrollHeight={50}
                        keyboardShouldPersistTaps="handled"
                        enableResetScrollToCoords={false}
                    >
                        <FieldList
                            title={formData.title}
                            setTitle={(newTitle) => {
                                setFormData((prev) => 
                                    ({ ...prev, title: newTitle }));
                                setIsUnsaved(true);
                            }}
                            body={formData.body}
                            setBody={(newBody) => {
                                setFormData((prev) =>
                                    ({ ...prev, body: newBody }));
                                setIsUnsaved(true);
                            }}
                            onFocus={handleFocus}
                        />
                        <ReferenceFieldList
                            reference={formData.reference}
                            setReference={handleInputReferenceChange}
                            onFocus={handleFocus}
                        />
                        <Button
                            title="保存する"
                            icon={styles.icon}
                            iconContainerStyle={styles.iconContainer}
                            containerStyle={styles.saveButtonContainer}
                            buttonStyle={styles.saveButtonStyle}
                            onPress={() => {
                                //FIXME 一度保存ボタンを押すとアラートが解除され、未保存でも画面遷移できてしまう
                                setIsUnsaved(false);    //アラートを解除
                                onSave(formData);
                            }}
                        />
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,    //参考文献リストが増えてもスクロールできるように設定
        padding: 10
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