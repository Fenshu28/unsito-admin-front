import React, {useEffect,useState} from "react";
import { obtenerCategorias } from "../../../services/categoriaService";

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setMensaje("Error al cargar categorías");
    }
  };


  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div>
      <h5 className="fw-semibold mb-3">Categorías existentes</h5>
      {mensaje && <p className="text-danger">{mensaje}</p>}

      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No hay categorías registradas
              </td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion || "—"}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCategorias;
