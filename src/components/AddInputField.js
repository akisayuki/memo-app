//入力フィールドを追加

import { useState } from "react"
import FieldList from "./FieldList";
import ReferenceFieldList from "./ReferenceFieldList";
import { View } from "react-native";

const AddInputField = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [reference, setReference] = useState([]);

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

export default AddInputField;