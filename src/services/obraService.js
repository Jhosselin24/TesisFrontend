import api from "./api";

// obtener todas las obras
export const getObras = async () => {
  const res = await api.get("/obras");
  return res.data;
};

// crear obra (CON PORTADA)
export const createObra = async (data) => {
  const formData = new FormData();

  formData.append("titulo", data.titulo);
  formData.append("descripcion", data.descripcion);
  formData.append("autor", data.autor);
  formData.append("estado", data.estado);

  // imagen portada
  if (data.portada) {
    formData.append("portada", data.portada);
  }

  const res = await api.post("/obras", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};

// actualizar obra (CON PORTADA OPCIONAL)
export const updateObra = async (id, data) => {
  const formData = new FormData();

  formData.append("titulo", data.titulo);
  formData.append("descripcion", data.descripcion);
  formData.append("autor", data.autor);
  formData.append("estado", data.estado);

  if (data.portada) {
    formData.append("portada", data.portada);
  }

  const res = await api.put(`/obras/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};

// eliminar obra
export const deleteObra = async (id) => {
  const res = await api.delete(`/obras/${id}`);
  return res.data;
};