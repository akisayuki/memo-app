import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/MainScreen';
import NewEntryScreen from './src/NewEntryScreen';
import { useEffect } from 'react';
import { initDatabase } from './src/components/DatabaseOperations';

//Navigationの設定
const MyStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: MainScreen,
      options: {
        title: 'メモ一覧'
      }
    },
    NewEntry: {
      screen: NewEntryScreen,
      options: {
        title: '新規作成'
      }
    }
  }
});

const Navigation = createStaticNavigation(MyStack);

export default function App() {
  //データベースの初期化をアプリ起動時に実行
  useEffect(() => {
    //useEffectで非同期関数を使う場合は、ラップ関数を定義して呼び出す必要がある
    const init = async () => {
      try {
        await initDatabase();
        console.log('Database initialized successfully.');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }
    init();
  }, []);

  return (
    <Navigation />
  );
}