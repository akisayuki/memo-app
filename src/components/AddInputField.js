//入力フィールドを追加

import { useState } from "react";
import FieldList from "./FieldList";
import ReferenceFieldList from "./ReferenceFieldList";
import { StyleSheet, View } from "react-native";

const AddInputField = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [reference, setReference] = useState([
        {
            id: Date.now(),
            value: reference,
            placeholder: "URL、書籍名など",
            style: styles.inputLine
        }
    ]);

    return(
        <View>
            <FieldList
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
            />
            <ReferenceFieldList
                reference={reference}
                setReference={setReference}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputLine: {
        flex:1,
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16,
        maxHeight: 80
    }
});

export default AddInputField;