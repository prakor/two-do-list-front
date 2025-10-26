import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
const MainLayout = () => {
  return (
    <div className="main-layout flex flex-row">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
