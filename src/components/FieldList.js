//入力フィールドのタイトルと本文のUIを表示するコンポーネント

import { StyleSheet, View, Text } from "react-native";
import InputField from "./InputField";

const FieldList = ({ title, setTitle, body, setBody }) => {
    //InputFieldに渡すタイトルと本文の要素
    const settingItems = [
        {
            id: 'title',
            value: title,
            onChangeText: setTitle,
            placeholder: "タイトル",
            style: styles.inputLine
        },
        {
            id: 'body',
            value: body,
            onChangeText: setBody,
            placeholder: "本文",
            style: styles.inputBox
        }
    ];

    //UIを定義
    return settingItems.map((data) => {
        return(
            <View key={data.id}>
                <Text style={styles.text}>{data.placeholder}</Text>
                <InputField
                    {...data}
                />
            </View>
        );
    });
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        margin: 10
    },
    inputLine: {
        flex:1,
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
    },
    inputBox: {
        margin: 10,
        borderColor: 'silver',
        borderWidth: 1,
        fontSize: 16,
        maxHeight: 200
    }
});

export default FieldList;