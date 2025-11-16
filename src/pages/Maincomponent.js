import Sidebar from "../components/SideBar";
import PrivateRoutes from "../router/PrivateRoutes";

const Maincomponent = () => {
  return (
    <div className="d-flex">
      <Sidebar />

      {/* Renderización de las rutas hijas */}
      <div className="flex-grow-1 p-3">
        <PrivateRoutes />
      </div>
    </div>
  );
};

export default Maincomponent;
