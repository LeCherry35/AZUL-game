import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Game from './components/Game/Game';
import GameMenu from './components/GameMenu/GameMenu';

function App() {

  return (
    
    <div className="App">
    
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      
      </BrowserRouter>
      

    </div>
  );
}

export default App;
