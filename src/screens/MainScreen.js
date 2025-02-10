//メモ一覧（ホーム）画面

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FAB } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAllData } from "../components/DatabaseOperations";


const MainScreen = ({ route }) => {
    const { isDatabaseReady } = route.params;   //App.jsからisDataBaseReadyの値を取得
    const navigation = useNavigation();
    const [inputData, setInputData] = useState([]);
    
        //useFocusEffectにより、画面がフォーカスされている際にデータを取得
        useFocusEffect(
            React.useCallback(() => {
                let isActive = true;    //アクティブ状態を追跡

                //データベースが作成されている時にのみ、データを取得
                if (isDatabaseReady) {
                    const fetchData = async () => {
                        try {
                            const result = await getAllData();

                            if (isActive) {
                                setInputData(result);
                            }
                        } catch (error) {
                            console.error('Error loading data:', error);
                        }
                    }

                    fetchData();
                }

                //クリーンアップ関数
                return () => {
                    isActive = false;   //アンマウント時にfetchDataを中止
                };
            }, [isDatabaseReady])
        );

        //FlatListで表示された要素をタップすると、詳細画面に遷移を行う
        const handleNavigate = (item) => {
            //inputDataに引数itemの中身を渡す
            navigation.navigate('Detail', { inputData: item });
        }
        const renderItem = ({ item }) => {
            return(
                <Pressable
                    onPress={() => handleNavigate(item)}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                </Pressable>
            );
        }
        
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={inputData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return renderItem({ item });
                    }}
                />
                {/* 新規作成ボタンを表示 */}
                <FAB
                    size="large"
                    icon={{name: 'add', color: 'white'}}
                    color="#66ccff"
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