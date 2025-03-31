import { style, Text, Pressable, View } from 'react-native';
import ButtonStyle from '../constants/ButtonStyle';
// Import StyleSheet from ButtonStyle

// It takes empty function as the function is carried from previous page that specifies which page to navigate to in <AddToDo>.
// label is specified from previous page in <AddToDoButton>.
// icon refers to icon passed from previous page.
export default function AddToDoButton({label, func=()=>{}, icon, style={}}){
    return(
// {pressed} destructures pressed to find out if the state of the button is pressed.
// if pressed, the button is applied with style from ButtonStyle and opacity change.
// when it is not pressed, the button is only applied with style from ButtonStyle.
        <Pressable style={({pressed})=>pressed?[ButtonStyle.container, style, {opacity:0.5}]
            :[ButtonStyle.container,style]}
            onPress={func}>
{/* Display label of the Buttom defined in whichever file that uses it. */}
            <View style={ButtonStyle.content}>
                {icon}
                <Text style={ButtonStyle.text}>{label}</Text>
            </View>
        </Pressable>
    );
}
