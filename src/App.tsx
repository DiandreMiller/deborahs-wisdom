import { BrowserRouter, Routes, Route } from "react-router-dom";


// import HomePage from './Pages/HomePage';
import DeborahGamePage from "./Pages/DeborahGamePlay";
import './App.css'
// import FOUROFOUR from "./Pages/FOUROFOUR";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<HomePage />} path='/' /> */}
          <Route element={<DeborahGamePage />} path='/play' />
          {/* <Route element={<FOUROFOUR />} path='*' /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App