import {View, StyleSheet, Text, FlatList} from "react-native";
import Task from "../constants/Task"

// Destructure tasks from Home.
export default function ListofItems({tasks}){
// render each object to display each of them properly
    const renderTask = ({item}) => (
        <View style={Task.container} key={item.id}>
            <Text style={Task.title}>{item.title}</Text>
            {item.description? <Text style={Task.text}>{item.description}</Text>:null}
        </View>
    );

    return (
        <View style={Task.body}>
{/* Use FlatList to imrpove performance because items scroll off screen are recycled. */}
            <FlatList
// data takes tasks array passed from Home.
                data={tasks}
// renderItem takes renderTask function ti display item one by one uing Task style.
                renderItem={renderTask}
// keyExtractor generates unique keys for each item to update only items that change.
                keyExtractor={(item) =>item.id.toString()}
// style the scrollable content
            />
        </View>
    );
}