import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import Login from "../view/Login";
import SignUp from "../view/Signup";

export type AuthStackParamList = {
    Login : undefined;
    Signup : undefined;
};

export type AuthNavigationProps<AuthRoute extends keyof AuthStackParamList> = NativeStackNavigationProp<AuthStackParamList, AuthRoute>;

export default function AuthNavigator(){
    const Stack = createNativeStackNavigator<AuthStackParamList>(); 
    
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
    )
}