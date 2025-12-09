import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRouter from "./router/PublicRouter";
import Maincomponent from "./pages/Maincomponent";
import { TaxonomyProvider } from "./context/TaxonomyContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>


    <ToastProvider>
      <TaxonomyProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/*" element={<PublicRouter />} />

            {/* Rutas privadas */}
            <Route path="/App/*" element={<Maincomponent />}>
              
            </Route>
          </Routes>
        </Router>
      </TaxonomyProvider>
    </ToastProvider>
    </ThemeProvider>

  );
}

export default App;
