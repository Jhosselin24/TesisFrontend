import { useEffect, useState } from "react";

import {
  getUsers,
  deleteUser,
  changeRole,
  blockUser
} from "../services/userService";

import {
  FaTrash,
  FaUserShield,
  FaUserLock,
  FaUsersCog
} from "react-icons/fa";

export default function AdminUsers() {

  /*STATES*/
  const [users, setUsers] = useState([]);

  /*OBTENER USUARIOS*/
  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  /*CAMBIAR ROL*/
  const handleRoleChange = async (id, role) => {

    try {

      await changeRole(id, role);
      fetchUsers();

    } catch (error) {

      console.error(error);
    }
  };

  /*BLOQUEAR USUARIO*/
  const handleBlock = async (id) => {

    const confirmBlock = window.confirm(
      "¿Deseas bloquear este usuario?"
    );

    if (!confirmBlock) return;

    try {

      await blockUser(id);

      fetchUsers();

    } catch (error) {

      console.error(error);
    }
  };

  /*ELIMINAR USUARIO*/
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "¿Deseas eliminar este usuario?"
    );

    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      fetchUsers();

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-[#FEF2E1] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-amber-100 p-5 rounded-2xl">

              <FaUsersCog className="text-5xl text-amber-700" />

            </div>

            <div>

              <h1 className="text-4xl font-black text-[#2c3e50]">
                Panel Administrativo
              </h1>

              <p className="text-slate-500 mt-2">
                Gestiona usuarios, permisos y accesos del sistema.
              </p>

            </div>

          </div>

        </div>

        {/* TABLA */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              {/* HEAD */}
              <thead className="bg-amber-700 text-white">

                <tr>

                  <th className="px-6 py-5 text-left">
                    Usuario
                  </th>

                  <th className="px-6 py-5 text-left">
                    Correo
                  </th>

                  <th className="px-6 py-5 text-left">
                    Rol
                  </th>

                  <th className="px-6 py-5 text-center">
                    Estado
                  </th>

                  <th className="px-6 py-5 text-center">
                    Acciones
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {
                  users.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-10 text-slate-500"
                      >
                        No existen usuarios registrados.
                      </td>

                    </tr>

                  ) : (

                    users.map((user) => (

                      <tr
                        key={user._id}
                        className="border-b border-slate-200 hover:bg-amber-50 transition"
                      >

                        {/* NOMBRE */}
                        <td className="px-6 py-5">

                          <div>

                            <p className="font-bold text-[#2c3e50]">
                              {user.name}
                            </p>

                            <p className="text-sm text-slate-400">
                              Usuario del sistema
                            </p>

                          </div>

                        </td>

                        {/* EMAIL */}
                        <td className="px-6 py-5 text-slate-600">
                          {user.email}
                        </td>

                        {/* ROL */}
                        <td className="px-6 py-5">

                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(
                                user._id,
                                e.target.value
                              )
                            }
                            className="border border-slate-300 rounded-xl px-4 py-2 focus:outline-none"
                          >

                            <option value="lector">
                            Lector
                            </option>

                            <option value="autor">
                            Autor
                            </option>

                            <option value="admin">
                            Administrador
                            </option>

                          </select>

                        </td>

                        {/* ESTADO */}
                        <td className="px-6 py-5 text-center">

                          <span
                            className={
                              user.blocked
                                ? "bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold"
                                : "bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold"
                            }
                          >
                            {
                              user.blocked
                                ? "Bloqueado"
                                : "Activo"
                            }
                          </span>

                        </td>

                        {/* ACCIONES */}
                        <td className="px-6 py-5">

                          <div className="flex justify-center gap-3">

                            {/* BLOQUEAR */}
                            <button
                              onClick={() =>
                                handleBlock(user._id)
                              }
                              className="bg-orange-500 hover:bg-orange-400 text-white p-3 rounded-xl transition"
                            >

                              <FaUserLock />

                            </button>

                            {/* ELIMINAR */}
                            <button
                              onClick={() =>
                                handleDelete(user._id)
                              }
                              className="bg-red-500 hover:bg-red-400 text-white p-3 rounded-xl transition"
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </section>
  );
}