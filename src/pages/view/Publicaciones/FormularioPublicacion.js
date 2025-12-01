import React, { useState, useEffect } from "react";

const FormularioPublicacion = ({ 
  publicacionActual, 
  categorias, 
  tipos, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    fecha: "",
    isFeatured: false,
    status: "Draft"
  });

  useEffect(() => {
    if (publicacionActual) {
      setFormData({
        titulo: publicacionActual.titulo || "",
        descripcion: publicacionActual.descripcion || "",
        categoria: publicacionActual.categoria?._id || "",
        tipo: publicacionActual.tipo?._id || "",
        fecha: publicacionActual.fecha ? publicacionActual.fecha.split('T')[0] : "",
        isFeatured: publicacionActual.isFeatured || false,
        status: publicacionActual.status || "Draft"
      });
    }
  }, [publicacionActual]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      categoria: "",
      tipo: "",
      fecha: "",
      isFeatured: false,
      status: "Draft"
    });
    if (onCancel) onCancel();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          {publicacionActual ? "Editar Publicación" : "Nueva Publicación"}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          {/* Título */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Título <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingrese el título de la publicación"
              required
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Descripción */}
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={6}
              placeholder="Ingrese la descripción de la publicación"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          {/* Categoría y Tipo */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Categoría
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Tipo
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="">Seleccione un tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo._id} value={tipo._id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fecha y Estado */}
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Fecha de Publicación
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="Draft">Borrador</option>
                <option value="Published">Publicado</option>
              </select>
            </div>
          </div>

          {/* Destacado */}
          <div className="mb-6">
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border ${formData.isFeatured ? 'border-primary bg-gray dark:bg-transparent' : 'border-body'}`}>
                  <span className={`text-primary ${formData.isFeatured ? 'opacity-100' : 'opacity-0'}`}>
                    <svg
                      className="fill-current"
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill=""
                        stroke=""
                        strokeWidth="0.4"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <p className="text-black dark:text-white">Publicación destacada</p>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {publicacionActual ? "Actualizar" : "Crear"} Publicación
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex justify-center rounded border border-stroke p-3 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioPublicacion;
