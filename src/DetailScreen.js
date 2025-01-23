//各データを列挙して表示する画面

import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { deleteRecord } from "./components/DatabaseOperations";
import { useNavigation } from "@react-navigation/native";


const DetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const { inputData } = route.params;

    //ヘッダーとしてタイトルと本文を設定することで、スクロールが可能
    const listHeaderComponent = () => {
        return(
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{inputData.title}</Text>
                <Text style={styles.body}>{inputData.body}</Text>
                <Text style={styles.referenceTitle}>参考文献リスト</Text>
            </View>
        );
    }

    //削除に成功した場合、メイン画面に戻る
    const handleDelete = () => {
        try {
            Alert.alert('確認', 'メモを削除します。よろしいですか？', [
                {
                    text: 'キャンセル',
                    style: 'cancel'
                },
                {
                    text: '削除',
                    //非同期にすることで、削除の成功を待ってから画面遷移を行う
                    onPress: async () => {
                        await deleteRecord(inputData.id);
                        navigation.goBack();
                    },
                    style: 'destructive'
                }
            ]);
        } catch (error) {
            console.error('Failed to delete or go back:', error);
        }
    }

    //フッターとして削除ボタンを配置
    const listFooterComponent = () => {
        return (
            <Button
                title="このメモを削除する"
                color="red"
                onPress={handleDelete}
            />
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={inputData.reference}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={listHeaderComponent}
                    renderItem={({ item }) => {
                        return <Text style={styles.reference}>{item.text}</Text>;
                    }}
                    ListFooterComponent={listFooterComponent}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
        justifyContent: 'center'
    },
    itemContainer: {
        marginTop: 16,
        paddingBottom: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        paddingBottom: 10,
        marginBottom: 10
    },
    body: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        paddingBottom: 20,
        margin: 5
    },
    referenceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10
    },
    reference: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5
    }
});

export default DetailScreen;