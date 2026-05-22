import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar.jsx";
import Header from "@components/Header/Header.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout flex flex-row w-full h-full">
      <Sidebar />
      <main className="w-full">
        <Header />
        {/* Supports both sample-style children rendering and nested-route Outlet fallback */}
        {children ?? <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;
