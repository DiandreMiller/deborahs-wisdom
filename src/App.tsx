import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

// Pages
import DeborahGamePage from "./Pages/DeborahGamePlay";
import DeborahHomePage from "./Pages/DeborahHomePage";
import FOUROFOUR from "./Pages/FOUROFOUR";

// Commons
import Footer from "./commons/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        
        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DeborahHomePage />} />
            <Route path="/play" element={<DeborahGamePage />} />
            <Route path="*" element={<FOUROFOUR />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;