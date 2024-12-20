//メモ一覧（ホーム）画面

import { useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//仮実装のデータ
const data = [
    {
        title: "好きな食べ物",
        contents: "ネギ",
        //TODO タイムスタンプを取得
        id: 0
    },
    {
        title: "明日の気温",
        contents: "午前中は寒い。昼間は20度まで上がり、夜はまた冷える。",
        id: 1
    },
    {
        title: "今週の夕飯",
        contents: "カレー2回、親子丼、中華丼、冷凍パスタ",
        id: 2
    }
];

//データの各要素を描画
const Item = ({item}) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.contents}</Text>
        </View>
    );
}

//メイン画面
const MainScreen = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return (
                            //Itemコンポーネントのpropsであるitemを設定
                            <Item item={item}/>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
                {/* 新規作成ボタンを表示 */}
                <FAB
                    size="large"
                    icon={{name: 'add', color: 'white'}}
                    color="lightblue"
                    placement="right"
                    style={styles.fab}
                    onPress={() => navigation.navigate('NewEntry')}
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
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemText: {
        fontSize: 16,
        marginTop: 12
    },
    fab: {
        margin: 10,
        right: 10,
        bottom: 10
    }
});

export default MainScreen;