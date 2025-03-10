import { registerRootComponent } from 'expo';
import React from 'react';
import { AppProvider } from './src/context/AppContext';  // Updated path
import AppNavigator from './src/navigation/AppNavigator';  // Updated path
import 'setimmediate';


function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default registerRootComponent(App);
