//メモの編集を行う画面

import { useNavigation } from "@react-navigation/native";
import AddInputField from "../components/AddInputField";
import { updateData } from "../components/DatabaseOperations";
import { Alert } from "react-native";


const EditEntryScreen = ({ route }) => {
    const { inputData } = route.params;
    const navigation = useNavigation();
    
    //更新用のイベントハンドラ
    const handleUpdate = async (editData) => {
        try {
            //タイトルが空の場合、アラートを表示
            if (!editData.title.trim()) {
                Alert.alert('タイトルを入力してください');
                return;
            }

            //isDeletedフラグが立っている、かつ値が未入力なものを検出
            const emptyReferenceFields = editData.reference
                .some(ref => !ref.isDeleted && !ref.value.trim());

            if (emptyReferenceFields) {
                Alert.alert('未入力の参考文献フォームは削除してください');
                return;
            }

            const updateEntry = await updateData(
                editData.id,
                editData.title,
                editData.body,
                editData.reference
            );

            navigation.setParams({ inputData: updateEntry });
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to update or go back:', error);
        }
    }

    return (
        <AddInputField 
            initialData={inputData}
            onSave={handleUpdate}
        />);
}

export default EditEntryScreen;