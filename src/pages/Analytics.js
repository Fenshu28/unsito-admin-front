import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import StatsCard from "../components/StatsCard";
import TopPublicationsTable from "../components/TopPublicationsTable";
import {
  getDashboardStats,
  getTopPublicaciones,
} from "../services/analyticsService";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [topPublications, setTopPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async (initial = false) => {
    try {
      if (initial) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const data = await getDashboardStats();
      setStats(data);
      await loadTopPublications();
      setError(null);
    } catch (err) {
      setError("Error al cargar las estadísticas del dashboard");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const loadTopPublications = async () => {
    try {
      const data = await getTopPublicaciones("views", 10);
      setTopPublications(data.results || []);
    } catch (err) {
      console.error("Error al cargar top publicaciones:", err);
    }
  };

  if (error) {
    return (
      <div className="container my-4">
        {/* Error Card con estilo consistente */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 font-sans">
            Error
          </h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-300 font-sans">
            {error}
          </p>
          <button
            onClick={() => loadDashboardData(true)}
            // Botón consistente: brand? No, es error, rojo standard está bien.
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-sm"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-sans dark:text-white/90">
            Panel de estadísticas
          </h2>
          <p className="mt-1 text-sm text-gray-500 font-sans dark:text-gray-400">
            Estadísticas y métricas de tus publicaciones
          </p>
        </div>
        <button
          onClick={() => loadDashboardData(false)}
          disabled={loading || isRefreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:opacity-50"
        >
          <Icon
            icon="mdi:refresh"
            className={`${isRefreshing ? "animate-spin" : ""}`}
            width="20"
            height="20"
          />
          {isRefreshing ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Stats Cards Section */}
        <div className="col-span-12">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="mt-5">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : stats ? (
            <div
              className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 transition-opacity duration-300 ${isRefreshing ? "opacity-60" : "opacity-100"}`}
            >
              <StatsCard
                title="Total Publicaciones"
                value={stats.totalPublicaciones}
                icon="mdi:file-document-multiple"
                color="brand" // Usando Brand (Wine Red)
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
            loading={loading || isRefreshing}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
