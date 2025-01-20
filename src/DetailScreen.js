//各データを列挙して表示する画面

import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const DetailScreen = ({ route }) => {
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

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={inputData.reference}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={listHeaderComponent()}
                    renderItem={({ item }) => {
                        return <Text style={styles.reference}>{item.text}</Text>;
                    }}
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