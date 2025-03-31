import {View, Text, StyleSheet} from "react-native";
import Header from "../constants/Header";
import Line from "../constants/Line";
// Use Stylesheet of Header for title, line for line.

// Destructure title prop from Home.
export default function Title({title}){
    return(
// Display title and a line.
        <View style={Header.container}>
            <Text style={Header.text}>{title}</Text>
            <View style={Line}></View>
        </View>
    );


}
