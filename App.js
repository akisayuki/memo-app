import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/MainScreen';
import NewEntryScreen from './src/NewEntryScreen';

//Navigationの設定
const RootStack = createNativeStackNavigator({
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

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation />
  );
}