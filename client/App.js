import React from 'react';
import { SafeAreaView } from 'react-native';                    // <- RN core
import { SafeAreaProvider } from 'react-native-safe-area-context'; // <- provider único
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GlobalProvider } from './src/contexts/globalContext';
import StackScreen from './src/routes/stacks';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" translucent={false} />
        <GlobalProvider>
          <NavigationContainer>
            <StackScreen />
          </NavigationContainer>
        </GlobalProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
