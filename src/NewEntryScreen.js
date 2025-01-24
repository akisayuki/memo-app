//新規作成画面

import React from "react";
import AddInputField from "./components/AddInputField";
import { onSaveData } from "./components/DatabaseOperations";
import { useNavigation } from "@react-navigation/native";

const NewEntryScreen = () => {
    const navigation = useNavigation();

    //新規保存を実行する関数
    //onSubmitで渡された引数を受け取る
    const handleSave = async (title, body, reference) => {
            try {
                //保存を行ってから画面遷移を実行
                await onSaveData(title, body, reference);
                navigation.goBack();
            } catch (error) {
                console.error('Error saving or going back:', error);
            }
        }
    
    return <AddInputField onSubmit={handleSave} />;
}

export default NewEntryScreen;