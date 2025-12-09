import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import PrivateRoutes from "../router/PrivateRoutes";

const MainComponent = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fijo a la izquierda */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <NavBar />
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-boxdark-2">
          <PrivateRoutes />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
