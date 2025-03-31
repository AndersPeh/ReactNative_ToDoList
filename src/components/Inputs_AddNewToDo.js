import {View, StyleSheet, Text, TextInput} from "react-native";
// To manage count state of our application.
import { useState } from 'react';
import InputBox from "../constants/InputBox";
import Heading1 from "../constants/Heading1";

// Destructure tasks from Home.
export default function Inputs_AddNewToDo({title, setTitle, description, setDescription}){

    return (
        <View style={InputBox.body}>
            {/* <View style={InputBox.container}> */}
                <Text style={Heading1.text}>Title</Text>
                <TextInput style={InputBox.title_box}
                    placeholder="Please input title"
                    value={title}
// when user types something, onChangeText runs and setTitle("something") is called.
// title is updated by setTitle which updates value above.
                    onChangeText={setTitle}
                ></TextInput>
                <Text style={Heading1.text}>Description</Text>
                <TextInput style={InputBox.description_box}
                    placeholder="Please input description"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={5}
                ></TextInput>
            {/* </View> */}
        </View>
    );
}