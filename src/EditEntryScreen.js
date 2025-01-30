//メモの編集を行う画面

import { useNavigation } from "@react-navigation/native";
import AddInputField from "./components/AddInputField";
import { updateData } from "./components/DatabaseOperations";


const EditEntryScreen = ({ route }) => {
    const { inputData } = route.params;
    const navigation = useNavigation();
    
    //更新用のイベントハンドラ
    const handleUpdate = async (editData) => {
        try {
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