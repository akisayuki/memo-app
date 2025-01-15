//入力フィールドを追加

import { useState } from "react";
import FieldList from "./FieldList";
import ReferenceFieldList from "./ReferenceFieldList";
import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import { onSaveData } from "./DatabaseOperations";

const AddInputField = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [reference, setReference] = useState([
        {
            id: Date.now(),
            value: "",
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
            <Button
                title="保存する"
                icon={styles.icon}
                iconContainerStyle={styles.iconContainer}
                containerStyle={styles.saveButtonContainer}
                buttonStyle={styles.saveButtonStyle}
                onPress={() => onSaveData(title, body, reference)}
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
    },
    saveButtonContainer: {
        margin: 10,
        borderRadius: 10
    },
    saveButtonStyle: {
        backgroundColor: '#66ccff'
    },
    icon: {
        name: 'add',
        color: 'white'
    },
    iconContainer: {
        marginRight: 10
    }
});

export default AddInputField;