import React from 'react';

import {AuthProvider} from './src/context/auth';
import AppRoot from './src/App';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
}

export default App;
