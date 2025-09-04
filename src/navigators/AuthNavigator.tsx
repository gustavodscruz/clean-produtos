import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../view/Login";

export default function AuthNavigator(){
    const Stack = createNativeStackNavigator(); 
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}