import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Comunidad from "./pages/Comunidad"
import Beneficios from "./pages/Beneficios"
import Contacto from "./pages/Contacto"
import Capitulos from "./pages/Capitulos"

import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"

function App() {
  const isAuth = localStorage.getItem("token")

  return (
    <AuthProvider>
      <BrowserRouter>

        <div className="min-h-screen bg-[#FEF2E1]">

          <Navbar />

          <Routes>

            {/* 🔥 REDIRECCIÓN DINÁMICA INICIAL */}
            <Route
              path="/"
              element={
                isAuth
                  ? <Navigate to="/home" replace />
                  : <Navigate to="/login" replace />
              }
            />

            {/* PUBLICAS */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PRIVADAS */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/comunidad"
              element={
                <PrivateRoute>
                  <Comunidad />
                </PrivateRoute>
              }
            />

            <Route
              path="/beneficios"
              element={
                <PrivateRoute>
                  <Beneficios />
                </PrivateRoute>
              }
            />

            <Route
              path="/contacto"
              element={
                <PrivateRoute>
                  <Contacto />
                </PrivateRoute>
              }
            />

            <Route
              path="/obras/:id/capitulos"
              element={
                <PrivateRoute>
                  <Capitulos />
                </PrivateRoute>
              }
            />

            {/* 🔥 FALLBACK */}
            <Route
              path="*"
              element={
                isAuth
                  ? <Navigate to="/home" replace />
                  : <Navigate to="/login" replace />
              }
            />

          </Routes>

        </div>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App