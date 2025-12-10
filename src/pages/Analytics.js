import React, { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import TopPublicationsTable from "../components/TopPublicationsTable";
import { getDashboardStats, getTopPublicaciones } from "../services/analyticsService";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [topPublications, setTopPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      await loadTopPublications();
      setError(null);
    } catch (err) {
      setError("Error al cargar las estadísticas del dashboard");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTopPublications = async () => {
    try {
      const data = await getTopPublicaciones('views', 10);
      setTopPublications(data.results || []);
    } catch (err) {
      console.error("Error al cargar top publicaciones:", err);
    }
  };

  if (error) {
    return (
      <div className="container my-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">
            Error
          </h3>
          <p className="mt-2 text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Analytics Dashboard
        </h2>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Estadísticas y métricas de tus publicaciones
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Stats Cards Section */}
        <div className="col-span-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="mt-5">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              <StatsCard
                title="Total Publicaciones"
                value={stats.totalPublicaciones}
                icon="mdi:file-document-multiple"
                color="blue"
              />
              <StatsCard
                title="Vistas Totales"
                value={stats.allTime?.views}
                subtitle={`${stats.last30Days?.views?.toLocaleString() || 0} últimos 30 días`}
                icon="mdi:eye"
                color="green"
              />
              <StatsCard
                title="Descargas Totales"
                value={stats.allTime?.downloads}
                subtitle={`${stats.last30Days?.downloads?.toLocaleString() || 0} últimos 30 días`}
                icon="mdi:download"
                color="purple"
              />
              <StatsCard
                title="Guardados Totales"
                value={stats.allTime?.saves}
                subtitle={`${stats.last30Days?.saves?.toLocaleString() || 0} últimos 30 días`}
                icon="mdi:bookmark"
                color="orange"
              />
              <StatsCard
                title="Vistas (30 días)"
                value={stats.last30Days?.views}
                icon="mdi:chart-line"
                color="cyan"
              />
              <StatsCard
                title="Descargas (30 días)"
                value={stats.last30Days?.downloads}
                icon="mdi:download-circle"
                color="red"
              />
            </div>
          ) : null}
        </div>

        {/* Top Publications Table */}
        <div className="col-span-12">
          <TopPublicationsTable 
            publications={topPublications} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
