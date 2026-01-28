import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import StatsCard from "../components/StatsCard";
import {
  getDashboardStats,
  getTopPublicaciones,
} from "../services/analyticsService";

const Inicio = () => {
  const [stats, setStats] = useState(null);
  const [topPublications, setTopPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, topData] = await Promise.all([
          getDashboardStats(),
          getTopPublicaciones("views", 3),
        ]);
        setStats(statsData);
        setTopPublications(topData.results || []);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const quickActions = [
    {
      titulo: "Nueva Publicación",
      ruta: "/App/publicaciones",
      icon: "mdi:file-plus",
      color: "bg-brand-600",
      action: "create",
    },
    {
      titulo: "Gestionar Usuarios",
      ruta: "/App/usuarios",
      icon: "mdi:account-group",
      color: "bg-blue-600",
    },
    {
      titulo: "Administrar Categorías",
      ruta: "/App/categorias",
      icon: "mdi:tag-multiple",
      color: "bg-purple-600",
    },
    {
      titulo: "Ver Estadísticas",
      ruta: "/App/analytics",
      icon: "mdi:chart-bar",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Saludo y Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 font-sans dark:text-white/90">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="mt-1 text-gray-500 font-sans dark:text-gray-400">
          Aquí tienes un resumen de lo que está pasando en tu plataforma hoy.
        </p>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl border border-gray-300 bg-white animate-pulse"
            ></div>
          ))
        ) : (
          <>
            <Link
              to="/App/analytics"
              className="transition-transform hover:scale-[1.02]"
            >
              <StatsCard
                title="Total Publicaciones"
                value={stats?.totalPublicaciones}
                icon="mdi:file-document-multiple"
                color="brand"
              />
            </Link>
            <Link
              to="/App/analytics"
              className="transition-transform hover:scale-[1.02]"
            >
              <StatsCard
                title="Vistas Totales"
                value={stats?.allTime?.views}
                icon="mdi:eye"
                color="green"
              />
            </Link>
            <Link
              to="/App/analytics"
              className="transition-transform hover:scale-[1.02]"
            >
              <StatsCard
                title="Descargas Totales"
                value={stats?.allTime?.downloads}
                icon="mdi:download"
                color="purple"
              />
            </Link>
            <Link
              to="/App/analytics"
              className="transition-transform hover:scale-[1.02]"
            >
              <StatsCard
                title="Guardados Totales"
                value={stats?.allTime?.saves}
                icon="mdi:bookmark"
                color="orange"
              />
            </Link>
          </>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* Top Publicaciones (2/3 width) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 font-sans dark:text-white/90">
                Publicaciones más populares
              </h3>
              <Link
                to="/App/analytics"
                className="text-sm font-bold text-brand-600 hover:text-brand-700 font-sans"
              >
                Ver todas
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl bg-gray-50 animate-pulse"
                  ></div>
                ))
              ) : topPublications.length > 0 ? (
                topPublications.map((item, index) => (
                  <div
                    key={item.publicacion._id}
                    onClick={() =>
                      navigate(`/App/publicaciones/${item.publicacion._id}`)
                    }
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-brand-600 transition-colors group-hover:bg-white group-hover:shadow-sm">
                        <span className="text-lg font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors font-sans">
                          {item.publicacion.titulo}
                        </h4>
                        <p className="text-sm text-gray-500 font-sans">
                          {item.publicacion.categoria?.nombre ||
                            "Sin categoría"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 font-sans">
                        {item.stats.totalViews.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 font-sans">vistas</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 font-sans">
                  No hay datos de publicaciones disponibles aún.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Acciones Rápidas (1/3 width) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-6 text-xl font-bold text-gray-900 font-sans dark:text-white/90">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.ruta}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color} text-white shadow-sm transition-transform group-hover:scale-110`}
                  >
                    <Icon icon={action.icon} width="20" />
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-gray-900 transition-colors font-sans">
                    {action.titulo}
                  </span>
                  <Icon
                    icon="mdi:chevron-right"
                    className="ml-auto text-gray-300 group-hover:text-brand-600 transition-colors"
                    width="20"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Ayuda/Support Card */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 shadow-lg text-white">
            <h4 className="text-lg font-bold mb-2 font-sans">
              ¿Necesitas ayuda?
            </h4>
            <p className="text-brand-100 text-sm mb-4 font-sans">
              Consulta nuestra documentación o contacta con soporte técnico.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-bold backdrop-blur-sm font-sans">
              Documentación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
