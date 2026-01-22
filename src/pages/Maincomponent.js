import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import PrivateRoutes from "../router/PrivateRoutes";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen lg:flex bg-gray-50">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Contenedor principal con margen dinámico */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {/* Navbar */}
        <NavBar />

        {/* Contenido con scroll */}
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
          <PrivateRoutes />
        </div>
      </div>
    </div>
  );
};

const MainComponent = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default MainComponent;
