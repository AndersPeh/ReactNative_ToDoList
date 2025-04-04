import {View, Pressable, StyleSheet, Alert, Text, FlatList} from "react-native";
import Task from "../constants/Task";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Deconstruct todo from Home.
export default function ListofItems({Todo, deleteTodo, expandedStateKey, completedStateKey, expandedTodo, setexpandedTodo, completedTodo, setcompletedTodo}){


// function to flip expanded/ collapsed todo
    const expand_collapse = (todoId) => {
// setexpandedTodo enables currentTodo to receive current value of expandedTodo (starting from {undefined})
        setexpandedTodo(currentTodo => {
// to get all current todo states
            const newState ={
                ...currentTodo,
// create new object with [todoId] with true state or update the object state of currentTodo.
                [todoId]: !currentTodo[todoId]};
        const newStatestring = JSON.stringify(newState);
        AsyncStorage.setItem(expandedStateKey, newStatestring)
            .catch(error => console.log('Error saving expanded state:', error));
        return newState;

    });
// React replaces expandedTodo with new object after setexpandedTodo finishes running
    }

// function to mark complete
    const completeTodo = (todoId) => {
        const completedItem =  Todo.find(item => item.id === todoId);
    // setcompletedTodo enables currentTodo to receive current value of completedTodo (starting from {undefined})
        setcompletedTodo(currentTodo => {
    // to get all current todo states
            const newState = {
                ...currentTodo,
    // create new object with [todoId] with true state or update the object state of currentTodo.
                [todoId]: !currentTodo[todoId]};
            const newStatestring = JSON.stringify(newState);
            AsyncStorage.setItem(completedStateKey, newStatestring)
                .catch(error => console.log('Error saving completed state:', error));
        
            return newState;

        });
        Alert.alert(`Congratulations on completing ${completedItem.title}! `, "", [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ])
    // React replaces completedTodo with new object after setcompletedTodo finishes running
        }

    
// Make a up icon.
    const upIcon = <Ionicons name="caret-up-circle-outline"
    size={25}
    color="#004D66"
    />;

// Make a down icon.
    const downIcon = <Ionicons name="caret-down-circle-outline"
    size={25}
    color="#004D66"
    />;

// Make a trash icon.
    const trashIcon = <Ionicons name="trash-outline"
    size={25}
    color="red"
    />;

// Make a complete icon.
    const completeIcon = <Ionicons name="checkmark-done-circle-outline"
    size={25}
    color="green"
    />;


// display each todo  properly
    const eachTodo = ({item}) => (
        <View style={Task.container} key={item.id}>
            <View style={styles.boxRow}>
                <Text style={Task.title}>{item.title}</Text>
                {item.description? 
                    <Pressable
// flip the item state
                        onPress={()=>expand_collapse(item.id)}
                        style={styles.icon}
                    >
{/* when expanded, shows up icon. collapsed shows down icon*/}
                        {expandedTodo[item.id]?upIcon:downIcon}
                    </Pressable>
                :null}
            </View>
{/* when item has description and is expanded, show description text */}
            {(item.description && expandedTodo[item.id])?
                <Text style={Task.text}>{item.description}</Text>
            :null}
            {(expandedTodo[item.id])?
                <View style={styles.buttonsRow}>
    {/* completeIcon for incomplete Todo */}
                    {!completedTodo[item.id]?
                        <Pressable
                            onPress={()=>completeTodo(item.id)}
                            style={styles.completedicon}
                        >
                            {completeIcon}
                        </Pressable>
                    :null}
    {/* trashIcon for deleting */}
                    <Pressable
                        onPress={()=>deleteTodo(item.id)}
                        style={styles.icon}
                    >
                        {trashIcon}
                    </Pressable>
                </View>
            :null}
        </View>
    );

    return (
        <View style={Task.body}>
{/* Use FlatList to imrpove performance because items scroll off screen are recycled. */}
            <FlatList
// data takes tasks array passed from Home.
                data={Todo}
// renderItem takes eachTodo function to display item one by one uing Task style.
                renderItem={eachTodo}
// keyExtractor generates unique keys for each item to update only items that change.
                keyExtractor={(item) =>item.id.toString()}
// style the scrollable content
            />
        </View>
    );
}

const styles = StyleSheet.create({
    boxRow: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:10,
    },
    buttonsRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:10,
    },
    completedicon:{
        paddingRight:205,
    },
    icon:{
        padding:3,
    }

})
