import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar.jsx";
import Header from "@components/Header/Header.jsx";

const MainLayout = () => {
  return (
    <div className="main-layout flex flex-row w-full h-full">
      <Sidebar />
      <main className="w-full">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
