import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRouter from "./router/PublicRouter";
import Maincomponent from "./pages/Maincomponent";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRouter />} />

        {/* Rutas privadas */}
        <Route path="/app/*" element={<Maincomponent />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
