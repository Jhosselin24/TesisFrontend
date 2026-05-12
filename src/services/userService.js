import api from "./api";

/*OBTENER TODOS LOS USUARIOS*/
export const getUsers = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.get(
      "/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error al obtener usuarios:",
      error
    );

    throw error;
  }
};

/*ACTUALIZAR USUARIO*/
export const updateUser = async (id, data) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.put(
      `/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error al actualizar usuario:",
      error
    );

    throw error;
  }
};

/*ELIMINAR USUARIO*/
export const deleteUser = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.delete(
      `/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error al eliminar usuario:",
      error
    );

    throw error;
  }
};

/*CAMBIAR ROL*/
export const changeRole = async (id, role) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.patch(
      `/users/${id}/role`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error al cambiar rol:",
      error
    );

    throw error;
  }
};

/*BLOQUEAR USUARIO*/
export const blockUser = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.patch(
      `/users/${id}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error al bloquear usuario:",
      error
    );

    throw error;
  }
};