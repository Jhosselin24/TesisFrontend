import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useFetch } from "../hooks/useFetch"
import { API_BASE_URL } from "../utils/auth"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const fetchDataBackend = useFetch()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Completa todos los campos")
      return
    }

    try {
      setLoading(true)

      const url = `${API_BASE_URL}/auth/login`

      const response = await fetchDataBackend(url, {
        email,
        password
      }, "POST")

      if (response?.token) {
        // usa AuthContext (NO localStorage directo)
        login({
          token: response.token,
          user: response.user // si tu backend lo devuelve
        })

        toast.success("Bienvenido")

        setTimeout(() => {
          navigate("/home")
        }, 1200)

      } else {
        toast.error("Credenciales incorrectas")
      }

    } catch (error) {
      console.error(error)
      toast.error("Error del servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <ToastContainer />

      <div className="bg-white p-6 rounded-xl shadow w-80">

        <h2 className="text-2xl font-bold text-center mb-4">
          Login
        </h2>

        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-amber-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  )
}