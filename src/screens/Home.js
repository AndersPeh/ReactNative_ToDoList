import { StyleSheet, Button, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListofItems from '../components/ListofItems';
import Title from '../components/Title';
import HomeFooter from '../components/HomeFooter';
import PageLayout from '../constants/PageLayout';

export default function Home({ navigation, route }){
    // deconstruct useState with tasks and update function setTasks. Set tasks initial value as []
    const [tasks, setTasks] = useState([]);

// load tasks when the app is started.
    useEffect(() => {
// define async function to run Javascript as if it is like synchronous.
        const loadTasks = async () => {
            try {
// wait for storage read, means it is set aside to run and proceed with other stuff in Callstack.
                const savedTasksString = await AsyncStorage.getItem('tasks');
                if (savedTasksString !== null) {
// if savedTasksString exists, update state with saved data.
                    setTasks(JSON.parse(savedTasksString));
                } else {
// if there is nothing saved, use my default to do list.
                    const defaultTasks = [
                        {id: "1", title: "Buy milk", description: "Coles brand"},
                        {id: "2", title: "Buy fruit", description: "Discount fruit barn"},
                        {id: "3", title: "Buy chicken", description: "Costco"}
                    ];
// set my default to do list in state and save.
                    setTasks(defaultTasks);
                    await AsyncStorage.setItem('tasks', JSON.stringify(defaultTasks));
                }
            } catch (error) {
                console.log('Error loading Todo List:', error);
            }
        };
        loadTasks();
// [] empty dependency array means when Home screen first loads, it triggers this userEffect to load tasks.
    }, []);

    // add task function
    const addTask = async (title, description) => {
        try {
// get existing tasks
            const savedTasksString = await AsyncStorage.getItem('tasks');
            let currentTasks = [];
// if there is existing todo tasks, put them in currentTasks.
            if (savedTasksString !== null) {
                currentTasks = JSON.parse(savedTasksString);
            }
            
            const newTask = {
                id: Math.random().toString(),
                title: title,
                description: description
            };
// combine existing and new tasks.
            const updatedTasks = [...currentTasks, newTask];
            
// Update state and save to storage.
            setTasks(updatedTasks);
            
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            console.log("Todo List added successfully.");
        } catch (error) {
            console.log('Error saving Todo List:', error);
        }
    };

// useEffect as listener.
    useEffect(() => {

// if navigation from AddToDo screen has a new task

        if (route.params?.newTask) {
// add new task data and clear navigation parameters for React to recognise future new tasks.
            addTask(route.params.newTask.title, route.params.newTask.description);
            navigation.setParams({ newTask: null });
        }
// this dependency means useEffect is trigerred when route parameters (navigation) changes and include
// a newTask from AddNewToDo screen.
    }, [route.params?.newTask]);


    return (
        <View style={PageLayout}>
            <Title title={"My Todo List"}></Title>
            <ListofItems tasks={tasks}></ListofItems>
            <HomeFooter navigation={navigation}></HomeFooter>           
        </View>
    );
}