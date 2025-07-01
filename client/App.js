import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import StackScreen from './src/routes/stacks';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GlobalProvider } from './src/contexts/globalContext';

export default function App() {
  return (
   
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" showHideTransition="fade" translucent={false} />

        <GlobalProvider>
          <NavigationContainer>
            <StackScreen />
          </NavigationContainer>
        </GlobalProvider>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
