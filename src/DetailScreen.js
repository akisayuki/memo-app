//各データを列挙して表示する画面

import { View, Text } from "react-native";


const DetailScreen = ({ inputData }) => {
    //TODO 参考文献リストも1行ずつ表示できるデザインにする
    return (
        <View>
            <Text>{inputData.title}</Text>
            <Text>{inputData.body}</Text>
            
        </View>
    )
}

export default DetailScreen;