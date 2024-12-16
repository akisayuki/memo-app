//メモ一覧（ホーム）画面

import { Text, View, StyleSheet } from "react-native";

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Text>メモ一覧画面</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainScreen;