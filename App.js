import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
