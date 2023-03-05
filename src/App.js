import LogIn from "./pages/LogIn/LogIn";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Main from "./pages/Main/Main";
import MenuGames from "./pages/MenuGames/MenuGames";
import FlipCoin from "./pages/FlipСoin/FlipCoin";
import GuessDoor from "./pages/GuessDoor/GuessDoor";
import FinalWindow from "./pages/FinalWindow/FinalWindow";

function App() {
  const { isAuth, balance, deposit } = useSelector((state) => state.user);

  return (
  <div className="App">
      <Router>
        {(isAuth) ? 
        <Routes>
          <Route path="*" element={<Navigate to="/menu" />} />
          <Route path="/" element={(balance <= deposit * 0.05 || balance > deposit * 2) ? <FinalWindow /> : <Main />}>
            <Route path="menu" element={ <MenuGames /> }/>
            <Route path="flipCoin" element={ <FlipCoin /> }/>
            <Route path="guessDoor" element={ <GuessDoor /> }/>
          </Route>
        </Routes> : 
        <Routes>
        <Route path="/login" element={ <LogIn /> } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes> }
      </Router>
  </div>
  );
}

export default App;
