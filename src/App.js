import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRouter from "./router/PublicRouter";
import Maincomponent from "./pages/Maincomponent";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/*" element={<PublicRouter />} />

            {/* Rutas privadas */}
            <Route path="/App/*" element={<Maincomponent />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
