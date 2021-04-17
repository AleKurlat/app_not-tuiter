import logo from './logo.svg';
import './App.css';
import Principal from "./proyecto/principal.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Principal />
      </header>
    </div>
  );
}

export default App;
