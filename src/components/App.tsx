import './App.css';

import FormContainer from './inputs/FormContainer';
import InputBox from './inputs/SpendingInput'
import InputColumn from './inputs/InputColumn';
import OutputColumn from './outputs/OutputColumn';

function App() : JSX.Element {
  return (
    <div className="App">
      <div className="App-header">
      <span className="Buildup">Spending Time</span>
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
