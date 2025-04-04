import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import Title from '../components/Title';
import PageLayout from '../constants/PageLayout';
import Inputs_AddNewToDo from '../components/Inputs_AddNewToDo';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddToDoButton from '../components/AddToDoButton';
import ButtonStyle from '../constants/ButtonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNewToDo({ navigation, route }){

// useState is an array with elements [currentvalue, default function to replace current value]
// use deconstruction to set currentvalue and update function as variables.
// sets currentvalue as empty string
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

// get storageKey, defaultTodo, setTodo from route parameters
    const { storageKey, defaultTodo, setTodo } = route.params;

// add todo function that accepts title and description from saveTodo
    const addTodo = async (title, description) => {
        try {
            let existingTodoObject = defaultTodo;
    // get existing todo
            const existingTodostring = await AsyncStorage.getItem(storageKey);
    // if there is existing todo, convert them to object.
            if (existingTodostring !== null) {
                existingTodoObject = JSON.parse(existingTodostring);
            } 
            const newTodo = {
                id: Math.random().toString(),
                title: title,
                description: description
            };
    // combine existing and new todo.
            const updatedTodo = [...existingTodoObject, newTodo];
            
    // replace current todo with updated to do and save to storage.
            setTodo(updatedTodo);
            
            const updatedTodoString = JSON.stringify(updatedTodo);

            await AsyncStorage.setItem(storageKey, updatedTodoString);
    // return success indicator
            return true;

        } catch (error) {
            console.log('Error saving Todo List:', error);
    // return failure indicator
            return false;
        }
    };

    const saveTodo= async() => {
        if(title.trim()!==""&&description.trim()!==""){
            const success = await addTodo(title, description);
            if (success){
// clear input fields
                setTitle("");
                setDescription("");

// will only show success message after it has successfully saved.
                Alert.alert(`Todo Added Successfully.`, "", [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ])
            }

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
                        label="Back" 
// navigate to Home.
                        func= {() =>navigation.goBack()}
                        icon={backIcon}
                        style={{width:"30%"}}
                    ></AddToDoButton>
                    <AddToDoButton 
                        label="Save" 
// use saveTodo to pass newToDo object to home.
                        func= {saveTodo}
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
