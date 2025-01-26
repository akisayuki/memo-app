//メモの編集を行う画面

import AddInputField from "./components/AddInputField";


const EditEntryScreen = ({ route }) => {
    const { inputData } = route.params;
    console.log(inputData);
    
    //更新用のイベントハンドラ

    //入力中の文字を保持して更新するイベントハンドラ
    

    return <AddInputField formData={inputData} />;
}

export default EditEntryScreen;