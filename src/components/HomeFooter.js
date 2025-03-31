import {View, Text, StyleSheet} from "react-native";
import AddToDoButton from './AddToDoButton';
import Line from "../constants/Line";
import Ionicons from "react-native-vector-icons/Ionicons";

// Destructure navigation prop passed from <Stack.Screen> to navigate to AddNewToDo screen.
export default function HomeFooter({navigation}){
// Make a plus icon for Add New Todo button.
    const plusIcon = <Ionicons name="add-circle"
    size={25}
    color="#004D66"
    style={styles.icon}/>;

    return(
// Display a line and a AddNewToDoButton.
        <View style={styles.container}>
            <View style={Line}></View>
            <AddToDoButton 
                label="Add New Todo" 
// navigate to Add New Todo which matches Stack.Screen name in App.js
// From Home to HomeFooter then pass to AddNewToDo screen.
                func= {() =>navigation.navigate("Add New Todo")}
                icon={plusIcon}
            ></AddToDoButton>
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