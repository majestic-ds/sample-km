import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {AuthProvider} from './context/AuthContext';
import TabbedNavigation from './navigation/tabbed';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <TabbedNavigation />
        </GestureHandlerRootView>
      </AuthProvider>
    </GluestackUIProvider>
  );
}

export default App;
