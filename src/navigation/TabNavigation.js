import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Favorites from '../pages/favorites';
import Dashboard from '../pages/dashboard';
import LogoutButton from '../components/LogoutButton';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const navigation = useNavigation();
    
    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'home';
                    } else if (route.name === 'Favorites') {
                        iconName = 'star';
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
                headerRight: () => <LogoutButton onLogout={handleLogout} />,
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                    color: '#2c3e50',
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Events' }} />
            <Tab.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
        </Tab.Navigator>
    );
}