import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./layouts/Layout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { logout } from "./store/slices/authSlice";
import { setAuthFailureHandler } from "./services/axiosInstance";
import Login from "@pages/Login/Login.jsx";
import Register from "@pages/Register/Register.jsx";
import Inbox from "@pages/Inbox/Inbox.jsx";
import Today from "@pages/Today/Today.jsx";
import Upcoming from "@pages/Upcoming/Upcoming.jsx";
import Projects from "@pages/Projects/Projects.jsx";
import NotFound from "@pages/NotFound/NotFound.jsx";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="inbox" element={<Inbox />} />
        <Route path="today" element={<Today />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="today" replace />} />
      </Routes>
    </MainLayout>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setAuthFailureHandler(() => dispatch(logout()));
    return () => setAuthFailureHandler(null);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/today" replace />} />

      <Route element={<Layout />}>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/app/today" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/app/today" replace /> : <Register />}
        />
      </Route>

      <Route path="/app/*" element={<ProtectedRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
