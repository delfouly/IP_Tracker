import React from 'react';
import {MyTabs} from './src/navigation';
import {SharedProvider} from './src/SharedContext';

function App(): React.JSX.Element {
  return (
    <SharedProvider>
      <MyTabs />
    </SharedProvider>
  );
}

export default App;
