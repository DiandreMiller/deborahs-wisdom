import { BrowserRouter, Routes, Route } from "react-router-dom";


import DeborahGamePage from "./Pages/DeborahGamePlay";
import './App.css'
import DeborahHomePage from "./Pages/DeborahHomePage";
import FOUROFOUR from "./Pages/FOUROFOUR";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<DeborahHomePage />} path='/' />
          <Route element={<DeborahGamePage />} path='/play' />
          <Route element={<FOUROFOUR />} path='*' />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App