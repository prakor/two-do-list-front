import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Login from "@pages/Login/Login.jsx";
import Register from "@pages/Register/Register.jsx";
import Inbox from "@pages/Inbox/Inbox.jsx";
import Today from "@pages/Today/Today.jsx";
import Upcoming from "@pages/Upcoming/Upcoming.jsx";
import Projects from "@pages/Projects/Projects.jsx";
import NotFound from "@pages/NotFound/NotFound.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Private */}
        <Route element={<MainLayout />}>
          <Route path="app/inbox" element={<Inbox />} />
          <Route path="app/today" element={<Today />} />
          <Route path="app/upcoming" element={<Upcoming />} />
          <Route path="app/projects" element={<Projects />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
