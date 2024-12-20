//新規作成画面

import { Input, ListItem } from "@rneui/themed";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const NewEntryScreen = () => {
    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView keyboardDismissMode="on-drag">
                    <TextInput
                        multiline
                        placeholder="タイトル"
                        style={styles.textBox}
                    />
                    <TextInput
                        multiline
                        placeholder="本文"
                        style={styles.textBox}
                    />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    textBox: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        fontSize: 16
    }
});

export default NewEntryScreen