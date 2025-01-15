//参考文献リストを表示

import { Alert, Text, StyleSheet, View, Button } from "react-native";
import InputField from "./InputField";

const ReferenceFieldList = ({ reference, setReference }) => {
    //参考文献フィールドを追加する
    const addReferenceField = () => {
        const referencePlaceholder = "URL、書籍名など";

        const newReference = {
            id: Date.now(),
            value: "",
            placeholder: referencePlaceholder,
            style: styles.inputLine
        };
        //上限に達するとアラートを表示
        if (reference.length < 20) {
            setReference([
                ...reference,
                newReference
            ]);
        } else {
            Alert.alert('登録できる参考文献の数は20件までです');
        }
    };

    //参考文献フィールドの入力値を取得する
    const handleReferenceChange = (id, value) => {
        const updateReference = reference.map((field) => {
            //idが合致した場合、オブジェクトをコピーして値を変更し、異なる場合はそのままオブジェクトを返す
            return field.id === id ? { ...field, value } : field
        });
        setReference(updateReference);
    }

    //参考文献フィールドを削除する
    const deleteReferenceField = ((id) => {
        setReference(
            reference.filter((field) => {
                return field.id !== id
            })
        );
    });

    return (
        <View>
            <View style={styles.referenceHeader}>
                <Text style={styles.text}>参考文献</Text>
                <Button
                    title="+"
                    onPress={addReferenceField}
                />
            </View>
            {reference.map((field) => {
                return(
                    <View key={field.id} style={styles.inputContainer}>
                        <Button
                            title="-"
                            color="red"
                            onPress={() => deleteReferenceField(field.id)}
                        />
                        <InputField
                            {...field}
                            onChangeText={(value) => handleReferenceChange(field.id, value)}
                        />
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    referenceHeader: {
        flexDirection: 'row',   //テキストとボタンを横並びに
    },
    inputContainer: {
        flexDirection: 'row',   //入力欄と削除ボタンを横並びに
        alignItems: 'center'
    },
    inputLine: {
        flex:1,
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
    },
    text: {
        fontSize: 18,
        margin: 10
    }
});

export default ReferenceFieldList;