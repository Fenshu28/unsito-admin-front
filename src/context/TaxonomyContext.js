import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerTaxonomia } from '../services/tiposService';

const TaxonomyContext = createContext();

export const useTaxonomy = () => {
  const context = useContext(TaxonomyContext);
  if (!context) {
    throw new Error('useTaxonomy must be used within a TaxonomyProvider');
  }
  return context;
};

export const TaxonomyProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTaxonomy();
  }, []);

  const loadTaxonomy = async () => {
    try {
      setLoading(true);
      const data = await obtenerTaxonomia();
      setCategorias(data.categorias || []);
      setTipos(data.tipos || []);
      setError(null);
    } catch (err) {
      console.error('Error loading taxonomy:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    categorias,
    tipos,
    loading,
    error,
    reload: loadTaxonomy
  };

  return (
    <TaxonomyContext.Provider value={value}>
      {children}
    </TaxonomyContext.Provider>
  );
};
