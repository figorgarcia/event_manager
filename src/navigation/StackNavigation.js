import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/login';
import TabNavigation from './TabNavigation';
import AddEvent from '../pages/addEvent';
import EditEvent from '../pages/editEvent';
import CreateAccount from '../pages/createAccount';
import ForgetPassword from '../pages/forgetPassword';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="AddEvent" component={AddEvent} options={{ title: 'Create Event' }} />
            <Stack.Screen name="EditEvent" component={EditEvent} options={{ title: 'Edit Event' }} />
            <Stack.Screen name='CreateAccount' component={CreateAccount} options={{ headerShown: false }} />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}