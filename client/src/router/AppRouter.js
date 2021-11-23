import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BalancePage from "../pages/BalancePage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../components/layout/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function Approuter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/balances"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
