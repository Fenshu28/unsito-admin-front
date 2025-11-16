import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import PrivateRoutes from "../router/PrivateRoutes";

const MainComponent = () => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar fijo */}
      <div className="flex-shrink-0 bg-light border-end">
        <Sidebar />
      </div>

      {/* Contenedor principal */}
      <div className="d-flex flex-column flex-grow-1">
        {/* Navbar */}
        <div>
          <NavBar />
        </div>

        {/* Contenido con scroll */}
        <div className="flex-grow-1 overflow-auto">
          <PrivateRoutes />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
