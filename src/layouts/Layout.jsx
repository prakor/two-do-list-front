import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <div className={`h-screen p-6 transition-all duration-300 
      ${isRegisterPage
        ? "bg-gradient-to-b from-amber-100 to-amber-500 md:bg-gradient-to-br lg:bg-gradient-to-r" : ""}`
    }>
      <Outlet />
    </div>
  );
};

export default Layout;
