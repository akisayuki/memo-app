import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/MainScreen';
import NewEntryScreen from './src/NewEntryScreen';
import { useEffect, useState } from 'react';
import { initDatabase } from './src/components/DatabaseOperations';
import { openDatabaseSync } from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import DetailScreen from './src/DetailScreen';


//Drizzle Studioを使用するためにデータベースを開く
const db = openDatabaseSync('app.db');

export default function App() {
  //データベースが作成されているかをstateで管理
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

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
        options: {
          title: '詳細'
        }
      }
    }
  });
  const Navigation = createStaticNavigation(MyStack);

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

  //Drizzle Studioプラグインをセットアップ
  useDrizzleStudio(db);

  return (
    <Navigation />
  );
}