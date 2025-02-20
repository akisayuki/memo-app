//入力フィールドをコンポーネント化

import { forwardRef } from "react";
import { Keyboard, TextInput } from "react-native";

/*
親コンポーネントからrefを受け取るために、forwardRefを使用
React 19以降では非推奨になる
*/
const InputField = forwardRef(({ value, onChangeText, placeholder, style, onFocus }, ref) => {
    return (
        <TextInput
            multiline
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={style}
            onFocus={onFocus}
            ref={ref}
            onBlur={() => Keyboard.dismiss()}
        />
    );
});

export default InputField;