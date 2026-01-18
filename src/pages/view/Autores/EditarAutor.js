import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  obtenerAutorPorId,
  actualizarAutor,
  crearAutor,
} from "../../../services/autoresService";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { useToast } from "../../../context/ToastContext";

const EditarAutor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const esNuevo = id === "nuevo";

  const [autor, setAutor] = useState({
    nombre: "",
    email: "",
    foto: "",
    biografia: "",
  });

  const [loading, setLoading] = useState(!esNuevo);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (esNuevo) return;

    const cargarAutor = async () => {
      try {
        const data = await obtenerAutorPorId(id);
        setAutor({
          nombre: data.nombre || "",
          email: data.email || "",
          foto: data.foto || "",
          biografia: data.biografia || "",
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del autor");
      } finally {
        setLoading(false);
      }
    };

    cargarAutor();
  }, [id, esNuevo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    setSaving(true);
    setError("");

    try {
      if (esNuevo) {
        await crearAutor(autor);
        toast.success("Autor creado correctamente");
      } else {
        await actualizarAutor(id, autor);
        toast.success("Autor actualizado correctamente");
      }

      navigate("/App/autores");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Error al guardar el autor";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando autor...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white dark:bg-boxdark rounded-2xl shadow-lg border border-stroke p-8">

        {/* Título */}
        <h2 className="text-2xl font-bold mb-8 text-center text-black dark:text-white">
          {esNuevo ? "Registrar Nuevo Autor" : "Editar Autor"}
        </h2>

        {/* Foto */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="w-32 h-32 rounded-full border overflow-hidden shadow">
            {autor.foto ? (
              <img
                src={autor.foto}
                alt={autor.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Sin foto
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">Foto del autor</p>
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre"
            value={autor.nombre}
            onChange={handleChange}
            placeholder="Nombre del autor"
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            value={autor.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />

          <TextField
            id="foto"
            name="foto"
            label="URL de Foto"
            value={autor.foto}
            onChange={handleChange}
            placeholder="https://imagen.com/foto.jpg"
          />
        </div>

        <div className="mt-6">
          <TextAreaField
            id="biografia"
            name="biografia"
            label="Biografía"
            value={autor.biografia}
            onChange={handleChange}
            placeholder="Escribe la biografía del autor"
            rows={5}
          />
        </div>

        {/* Botones */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/App/autores")}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleGuardar}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarAutor;
