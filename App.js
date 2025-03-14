import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import NewEntryScreen from './src/screens/NewEntryScreen';
import { useEffect, useState } from 'react';
import { initDatabase } from './src/components/DatabaseOperations';
import { openDatabaseSync } from 'expo-sqlite';
import DetailScreen from './src/screens/DetailScreen';
import EditEntryScreen from './src/screens/EditEntryScreen';
import { Button } from 'react-native';


//Drizzle Studioを使用するためにデータベースを開く
const db = openDatabaseSync('app.db');

export default function App() {
  //データベースが作成されているかをstateで管理
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  //データベースの初期化をアプリ起動時に実行
  useEffect(() => {
    //useEffectで非同期関数を使う場合は、ラップ関数を定義して呼び出す必要がある
    const init = async () => {
      try {
        await initDatabase();
        setIsDatabaseReady(true); //データベースの状態を準備完了に設定
        console.log('Database initialized successfully.');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }
    init();
  }, []);

  //Navigationの設定
  const MyStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
      Home: {
        screen: MainScreen,
        initialParams: { isDatabaseReady }, //コンポーネント間で共有
        options: {
          title: 'メモ一覧'
        }
      },
      NewEntry: {
        screen: NewEntryScreen,
        options: {
          title: '新規作成'
        }
      },
      Detail: {
        screen: DetailScreen,
        options: ({ route, navigation }) => {
          return (
            {
              title: '詳細',
              headerRight: () => {
                return (
                  <Button
                    title="編集する"
                    onPress={() => {
                      return navigation.navigate('Edit', { inputData: route.params.inputData });
                    }}
                  />
                );
              }
            }
          );
        }
      },
      Edit: {
        screen: EditEntryScreen,
        options: {
          title: '編集'
        }
      }
    }
  });
  const Navigation = createStaticNavigation(MyStack);

  return (
    <Navigation />
  );
}