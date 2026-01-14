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
        setAutores(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los autores");
      } finally {
        setLoading(false);
      }
    };

    cargarAutores();
  }, []);

  if (loading) return <p className="text-center">Cargando autores...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Lista de Autores
      </h2>

      {autores.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay autores registrados
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Foto
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {autores.map((autor) => (
                <tr
                  key={autor._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={autor.foto}
                      alt={autor.nombre}
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {autor.nombre}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {autor.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaAutores;
