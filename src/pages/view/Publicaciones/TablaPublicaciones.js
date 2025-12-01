import React from "react";

const TablaPublicaciones = ({ publicaciones, onVer }) => {
  const getStatusBadge = (status) => {
    const badges = {
      Draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      Published: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Trash: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    };
    const statusText = {
      Draft: "Borrador",
      Published: "Publicado",
      Trash: "Papelera"
    };
    return (
      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${badges[status] || badges.Draft}`}>
        {statusText[status] || status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Lista de Publicaciones
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Título
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Categoría
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Tipo
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Fecha
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Estado
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Destacado
              </th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.length === 0 ? (
              <tr>
                <td colSpan="6" className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                  <p className="text-black dark:text-white">No hay publicaciones</p>
                </td>
              </tr>
            ) : (
              publicaciones.map((pub) => (
                <tr
                  key={pub._id}
                  onClick={() => onVer(pub._id)}
                  className="cursor-pointer border-b border-[#eee] hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                >
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {pub.titulo}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {pub.categoria?.nombre || "-"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {pub.tipo?.nombre || "-"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(pub.fecha)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {getStatusBadge(pub.status)}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {pub.isFeatured ? "Sí" : "No"}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaPublicaciones;
