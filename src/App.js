import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Game from './components/Game/Game';

function App() {

  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<Game />} />
        </Routes>
      <Link to="/game">Start game</Link>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
