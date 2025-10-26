import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <div className="h-screen p-6">
      <Outlet/>
    </div>
  )
}

export default Layout
