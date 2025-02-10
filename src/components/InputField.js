//入力フィールドをコンポーネント化

import { TextInput } from "react-native";


const InputField = ({ value, onChangeText, placeholder, style}) => {
    return (
        <TextInput
            multiline
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={style}
        />
    );
}

export default InputField;