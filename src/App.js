import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRouter from "./router/PublicRouter";
import Maincomponent from "./pages/Maincomponent";
import { TaxonomyProvider } from "./context/TaxonomyContext";

function App() {
  return (
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
  );
}

export default App;
