// src/layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom"
const Layout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  const backgroundColor = {
    desktop: "bg-gradient-to-r from-amber-100 to-amber-500",
    tablet: "bg-gradient-to-br from-amber-100 to-amber-500",
    mobile: "bg-gradient-to-b from-amber-100 to-amber-500",
  };


  return (
    <div className={`h-screen p-6 transition-all duration-300 
      ${isRegisterPage
        ? "bg-gradient-to-b from-amber-100 to-amber-500 md:bg-gradient-to-br lg:bg-gradient-to-r" : ""}`
    }>
      <Outlet />
    </div>
  )
}

export default Layout
