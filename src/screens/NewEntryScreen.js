//新規作成画面

import React from "react";
import AddInputField from "../components/AddInputField";
import { onSaveData } from "../components/DatabaseOperations";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const NewEntryScreen = () => {
    const initialData = {
        title: '',
        body: '',
        reference: []
    }

    const navigation = useNavigation();

    //新規保存を実行する関数
    const handleSave = async (formData) => {
        try {
            //保存を行ってから画面遷移を実行
            await onSaveData(formData.title, formData.body, formData.reference);
            navigation.goBack();
        } catch (error) {
            console.error('Error saving or going back:', error);
        }
    }

    return (
        <AddInputField
            initialData={initialData}
            onSave={handleSave}
        />
    );
}

export default NewEntryScreen;