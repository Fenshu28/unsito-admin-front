import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRouter from "./router/PublicRouter";
import Maincomponent from "./pages/Maincomponent";
import { ToastProvider, useToast } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { setErrorHandler } from "./services/api";
import { useEffect } from "react";

function AppContent() {
  const toast = useToast();

  useEffect(() => {
    setErrorHandler((message) => {
      toast.error(message);
    });
  }, [toast]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/*" element={<PublicRouter />} />

        {/* Rutas privadas */}
        <Route path="/App/*" element={<Maincomponent />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
