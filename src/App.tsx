import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {AuthProvider} from './context/AuthContext';
import TabbedNavigation from './navigation/tabbed';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <TabbedNavigation />
      </AuthProvider>
    </GluestackUIProvider>
  );
}

export default App;
