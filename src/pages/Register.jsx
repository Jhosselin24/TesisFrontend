import { useState } from "react"
import {
  MdVisibility,
  MdVisibilityOff,
  MdAutoStories
} from "react-icons/md"

import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useFetch } from "../hooks/useFetch"
import { API_BASE_URL } from "../utils/auth"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const fetchDataBackend = useFetch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const registerUser = async (dataForm) => {
    try {
      setLoading(true)

      const url = `${API_BASE_URL}/usuarios/usuarios`
      const response = await fetchDataBackend(url, dataForm, "POST")

      if (response) {
        toast.success("Usuario registrado correctamente")
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        toast.error("No se pudo registrar el usuario")
      }

    } catch (error) {
      console.error(error)
      toast.error("Error en el servidor")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle =
    "block w-full pl-10 rounded-lg border border-gray-200 bg-white py-2.5 text-sm text-gray-700 focus:border-[#e67e22] focus:ring-1 focus:ring-[#e67e22] focus:outline-none transition-all duration-200 shadow-sm"

  const labelStyle =
    "mb-1.5 block text-xs font-bold uppercase text-[#2c3e50] tracking-widest"

  const errorStyle =
    "text-xs text-red-500 mt-1 font-semibold italic"

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
      <ToastContainer />

      {/* FORMULARIO */}
      <div className="w-full flex flex-col items-center justify-center px-6">

        <div className="w-full max-w-2xl">

          <header className="text-center mb-10">
            <div className="flex justify-center mb-4 text-[#e67e22]">
              <MdAutoStories size={50} />
            </div>

            <h1 className="text-3xl font-black text-[#2c3e50] uppercase">
              Circulo Literario <span className="text-[#e67e22]">EC</span>
            </h1>

            <p className="text-gray-500 mt-2 italic">
              Crea tu cuenta y empieza a leer
            </p>
          </header>

          <form
            onSubmit={handleSubmit(registerUser)}
            className="space-y-5 bg-white p-8 rounded-2xl shadow"
          >

            {/* NOMBRES */}
            <div>
              <label className={labelStyle}>Nombres</label>
              <input
                className={inputStyle}
                {...register("nombres", {
                  required: "Nombres son obligatorios"
                })}
              />
              {errors.nombres && <p className={errorStyle}>{errors.nombres.message}</p>}
            </div>

            {/* APELLIDOS */}
            <div>
              <label className={labelStyle}>Apellidos</label>
              <input
                className={inputStyle}
                {...register("apellidos", {
                  required: "Apellidos son obligatorios"
                })}
              />
              {errors.apellidos && <p className={errorStyle}>{errors.apellidos.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className={labelStyle}>Email</label>
              <input
                className={inputStyle}
                {...register("email", {
                  required: "Email obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email inválido"
                  }
                })}
              />
              {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className={labelStyle}>Contraseña</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputStyle}
                  {...register("password", {
                    required: "Contraseña obligatoria",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres"
                    }
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {errors.password && <p className={errorStyle}>{errors.password.message}</p>}
            </div>

            {/* BOTÓN */}
            <button
              disabled={loading}
              className="w-full bg-[#e67e22] text-white font-bold py-3 rounded-xl hover:bg-[#d35400] transition disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/login" className="text-[#2c3e50] font-semibold">
              Ya tienes cuenta? Inicia sesión
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register