import './App.css';
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import Table from './components/Table/Table';
import { useDispatch, useSelector } from "react-redux";

function App() {

  return (
    
    <div className="App">

      <Table />
      <PlayerBoard />

    </div>
  );
}

export default App;
