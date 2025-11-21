const BotonCerrar = ({ onClick }) => {
    return (
      <button
        type="button"
        className="btn btn-danger mt-auto"
        onClick={onClick}
      >
        Cerrar
      </button>
    );
  };
  
  export default BotonCerrar;
  