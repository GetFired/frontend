import { useState } from 'react';
import './App.css';

import InputColumn from './inputs/InputColumn';
import OutputColumn from './outputs/OutputColumn';

function App() : JSX.Element {
  const [vizData, setVizData] = useState<object>({});

  return (
    <div className="App">
      <div className="App-header">
      <span className="Punch">Witty Header</span>
        {/* <span className="Buildup">The Average American Works</span> */}
        {/* <span className="Punch">For 90,000 Hours</span> */}
      </div>
      <div className="content-block">
          <InputColumn />
          <OutputColumn />
      </div>
    </div>
  );
}

export default App;
