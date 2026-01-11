import { useEffect, useState } from "react";
import { obtenerAutores } from "../../../services/autoresService";

const ListaAutores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarAutores = async () => {
      try {
        const data = await obtenerAutores();
        setAutores(data); // 👈 ya viene como array
      } catch (err) {
        console.error(err);
        setError("Error al cargar los autores");
      } finally {
        setLoading(false);
      }
    };

    cargarAutores();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando autores...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Autores
      </h2>

      {autores.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay autores registrados
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {autores.map((autor) => (
            <div
              key={autor._id}
              className="bg-white shadow-md rounded-xl p-4"
            >
              {/* Foto */}
              {autor.foto ? (
                <img
                  src={autor.foto}
                  alt={autor.nombre}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}

              {/* Nombre */}
              <h3 className="text-xl font-semibold">
                {autor.nombre}
              </h3>

              {/* Email */}
              <p className="text-gray-600 text-sm">
                📧 {autor.email}
              </p>

              {/* Biografía */}
              <p className="text-gray-700 mt-2 text-sm">
                {autor.biografia}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaAutores;
