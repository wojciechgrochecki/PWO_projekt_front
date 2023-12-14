import "./App.css";
import RegistrationForm from "./components/Register/RegistrationForm";
import LoginForm from "./components/Login/LoginForm";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute/ProtectedRoute";
import { UserProvider } from "./hooks/auth";
import MainPage from "./components/MainPage/MainPage";
import AdminPanel from "./components/AdminPanel/AdminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/adminPanel" element={<AdminPanel />} />
          </Route>
        </Routes>
      </UserProvider>
      <ToastContainer hideProgressBar autoClose={1500} />
    </>
  );
}

export default App;
