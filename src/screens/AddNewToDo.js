import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import Title from '../components/Title';
import PageLayout from '../constants/PageLayout';
import Inputs_AddNewToDo from '../components/Inputs_AddNewToDo';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddToDoButton from '../components/AddToDoButton';
import ButtonStyle from '../constants/ButtonStyle';

export default function AddNewToDo({ navigation }){

// useState is an array with elements [currentvalue, default updateFunction]
// to use the elements in useState, deconstruction is used 
// to get current value and updatefunction then set as variables.
    // useState("", default reactnative update function) sets currentvalue as empty string
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

// Pass new task title and description to Home screen to save the task.
    const saveTask= () => {
        if(title.trim()!==""){
            navigation.navigate("Home",{
                newTask:{
                    title:title,
                    description:description
                }
            });
        }
    };

// Make a back icon.
    const backIcon = <Ionicons name="backspace-outline"
    size={25}
    color="#004D66"
    style={styles.icon}/>;

// Make a save icon.
    const saveIcon = <Ionicons name="save-outline"
    size={25}
    color="#004D66"
    style={styles.icon}/>;

    return (
        <View style={PageLayout}>
            <Title title={"Add New Todo"}></Title>
            <Inputs_AddNewToDo
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
            ></Inputs_AddNewToDo>
{/* Display buttons. */}
            <View style={styles.container}>
                <View style={ButtonStyle.addtodo_page_container}>
                    <AddToDoButton 
                        label="Cancel" 
        // navigate to Home.
                        func= {() =>navigation.goBack()}
                        icon={backIcon}
                        style={{width:"30%"}}
                    ></AddToDoButton>
                    <AddToDoButton 
                        label="Save" 
        // use addTaskFunction.
                        func= {saveTask}
                        icon={saveIcon}
                        style={{width:"22%"}}
                    ></AddToDoButton>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:50,
        justifyContent:"center",
        alignItems:"center",
        bottom:5,
        position: "absolute",
    },
    icon:{
        marginRight:8,
    },
})
