import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";



import EmpMan from './pages/EmpMan'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmpMan />
      </header>
    </div>
  );
}

export default App;
