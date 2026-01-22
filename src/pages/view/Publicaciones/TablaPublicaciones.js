import { Icon } from "@iconify/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";

const TablaPublicaciones = ({ publicaciones, onVer }) => {
  const getStatusColor = (status) => {
    const colors = {
      Draft: "warning",
      Published: "success",
      Trash: "error",
    };
    return colors[status] || "light";
  };

  const statusText = {
    Draft: "Borrador",
    Published: "Publicado",
    Trash: "Papelera",
  };

    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

  return (
    // Card con sombra y borde visible
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-theme-sm">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Header con fondo gris claro */}
          <TableHeader className="bg-gray-50 border-b border-gray-300">
            <TableRow>
              <TableCell
                isHeader
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Título
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Categoría
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Tipo
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Actualizado
              </TableCell>
              <TableCell
                isHeader
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
              >
                Estado
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Body con divisores visibles */}
          <TableBody className="divide-y divide-gray-300 bg-white">
            {publicaciones.length === 0 ? (
              <TableRow>
                <TableCell
                  className="px-6 py-8 text-center text-gray-500"
                  colSpan="5"
                >
                  No hay publicaciones
                </TableCell>
              </TableRow>
            ) : (
              publicaciones.map((pub) => (
                <TableRow
                  key={pub._id}
                  onClick={() => onVer(pub._id)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">
                        {pub.titulo}
                      </span>
                      {pub.isFeatured && (
                        <Badge
                          size="sm"
                          color="warning"
                          startIcon={<Icon icon="mdi:star" width="12" />}
                        >
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {pub.categoria?.nombre || "-"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {pub.tipo?.nombre || "-"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-500">
                    {formatDate(pub.updatedAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge size="sm" color={getStatusColor(pub.status)}>
                      {statusText[pub.status] || pub.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

  export default TablaPublicaciones;
