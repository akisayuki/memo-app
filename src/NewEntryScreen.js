//新規作成画面

import React, { useState } from "react";
import AddInputField from "./components/AddInputField";
import { onSaveData } from "./components/DatabaseOperations";
import { useNavigation } from "@react-navigation/native";

const NewEntryScreen = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        reference: []
    })

    const navigation = useNavigation();

    //新規保存を実行する関数
    const handleSave = async () => {
            try {
                //保存を行ってから画面遷移を実行
                await onSaveData(formData.title, formData.body, formData.reference);
                navigation.goBack();
            } catch (error) {
                console.error('Error saving or going back:', error);
            }
        }

    //onSubmitに渡すイベントハンドラ。updateFieldsは引数としてオブジェクトを受け取る
    const handleInputChange = (updateFields) => {
        //prevは更新前のオブジェクトを受け取る
        setFormData((prev) => {
            return (
                {
                    ...prev,
                    ...updateFields
                }
            );
        })
    }
    
    return (
        <AddInputField
            formData={formData}
            onSubmit={handleInputChange}
            onSave={handleSave}
        />
    );
}

export default NewEntryScreen;