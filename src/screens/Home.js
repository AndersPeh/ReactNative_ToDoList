import { Alert, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListofItems from '../components/ListofItems';
import Title from '../components/Title';
import HomeFooter from '../components/HomeFooter';
import PageLayout from '../constants/PageLayout';

export default function Home({ navigation, route }){

// set a key as unique identifier for interacting with data
    const key = "ToDoListApp";
    const expandedStateKey = "ToDoListAppExpandedState";
    const completedStateKey = "ToDoListAppCompletedState";

// deconstruct useState with tasks and update function setTasks. Set tasks initial value as []
    const [Todo, setTodo] = useState([]);

// set default expandedTodo as empty object so everything is collapsed in the beginning (undefined)
    const [expandedTodo, setexpandedTodo] = useState({});

// set default completedTodo as empty object so everything is incomplete in the beginning (undefined)
    const [completedTodo, setcompletedTodo] = useState({});

// default todo list
    const defaultTodo = [
        {id: "1", title: "Buy milk", description: "Coles brand"},
        {id: "2", title: "Buy fruit", description: "Discount fruit barn"},
        {id: "3", title: "Buy chicken", description: "Costco"}
    ];

// load Todo when the app is started using [].
    useEffect(() => {
// define async function to use await.
        const loadTodo = async () => {
            try {
// pauses execution until data is retrieved.
                const savedTodostring = await AsyncStorage.getItem(key);
                if (savedTodostring !== null) {
// if savedTasksString exists, convert to object
                    const savedTodoobject = JSON.parse(savedTodostring);
// replace current empty Todo with existing Todo.
                    setTodo(savedTodoobject);
                } else {
// replace empty todo list with my default to do list if no existing Todo.
                    setTodo(defaultTodo);
// pauses execution until data has been stored.
                    // await AsyncStorage.setItem('tasks', JSON.stringify(defaultTodo));
                }
// Load expanded state
                const savedExpandedString = await AsyncStorage.getItem(expandedStateKey);
                if (savedExpandedString !== null) {
                    setexpandedTodo(JSON.parse(savedExpandedString));
                }
            
// Load completed state
                const savedCompletedString = await AsyncStorage.getItem(completedStateKey);
                if (savedCompletedString !== null) {
                    setcompletedTodo(JSON.parse(savedCompletedString));
                }
// catch error just in case
            } catch (error) {
                console.log('Error loading Todo List:', error);
            }
        };
// call loadTodo to use now
        loadTodo();
// [] empty dependency array means when Home screen first loads, it triggers this userEffect to load one time only.
    }, []);


// delete Todo
    const deleteTodo = async(todoId) =>{
        try{
            const unwantedItem =  Todo.find(item => item.id === todoId);
// filter out the todo with the id selected by user.
            const remainingTodo = Todo.filter(item => item.id !== todoId);
// replace Todo with remainingTodo to hide unwanted item
            setTodo(remainingTodo);
// delete the deleted todo to update expanded state
            setexpandedTodo(currentState => {
                const newState = {...currentState};
                delete newState[todoId];
                const newStatestring = JSON.stringify(newState);
                AsyncStorage.setItem(expandedStateKey, newStatestring)
                    .catch(error => console.log('Error saving expanded state:', error));
                return newState;
            });

// delete the deleted todo to update completed state. 
            setcompletedTodo(currentState => {
                const newState = {...currentState};
                delete newState[todoId];
                const newStatestring = JSON.stringify(newState);
                AsyncStorage.setItem(completedStateKey, newStatestring)
                    .catch(error => console.log('Error saving completed state:', error));
                return newState;
            });


// save updated Todo 
            const remainingTodoString = JSON.stringify(remainingTodo);
            await AsyncStorage.setItem(key, remainingTodoString);
            Alert.alert(`${unwantedItem.title} Deleted Successfully.`, "", [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ])
        } catch (e) {
            console.log('Error deleting Todo item:', error);
        }
    }

    return (
        <View style={PageLayout}>
            <Title title={"My Todo List"}></Title>
            <ListofItems 
                Todo={Todo} 
                deleteTodo={deleteTodo}
                expandedStateKey={expandedStateKey}
                completedStateKey={completedStateKey}
                expandedTodo={expandedTodo}              
                setexpandedTodo={setexpandedTodo}     
                completedTodo={completedTodo}          
                setcompletedTodo={setcompletedTodo}
            ></ListofItems>
            <HomeFooter 
                navigation={navigation} 
                setTodo={setTodo}
                storageKey={key}
                defaultTodo={defaultTodo}
            ></HomeFooter>           
        </View>
    );
}