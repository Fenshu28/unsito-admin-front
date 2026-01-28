import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { obtenerTaxonomia } from "../services/tiposService";
import { obtenerAutores } from "../services/autoresService";

const TaxonomyContext = createContext();

export const useTaxonomy = () => {
  const context = useContext(TaxonomyContext);
  if (!context) {
    throw new Error("useTaxonomy must be used within a TaxonomyProvider");
  }
  return context;
};

export const TaxonomyProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTaxonomy();
  }, [loadTaxonomy]);

  const loadTaxonomy = useCallback(async () => {
    try {
      setLoading(true);
      const [taxData, autoresData] = await Promise.all([
        obtenerTaxonomia(),
        obtenerAutores("Active"),
      ]);

      setCategorias(taxData.categorias || []);
      setTipos(taxData.tipos || []);
      setAutores(autoresData || []);
      setError(null);
    } catch (err) {
      console.error("Error loading taxonomy:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      categorias,
      tipos,
      autores,
      loading,
      error,
      reload: loadTaxonomy,
    }),
    [categorias, tipos, autores, loading, error, loadTaxonomy],
  );

  return (
    <TaxonomyContext.Provider value={value}>
      {children}
    </TaxonomyContext.Provider>
  );
};
