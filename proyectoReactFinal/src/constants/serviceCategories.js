export const SERVICE_CATEGORY_DICTIONARY = {
  CF: {
    name: "Cuidados faciales",
  },
  PC: {
    name: "Pestañas y cejas",
  },
  TC: {
    name: "Tratamientos corporales",
  },
  MA: {
    name: "Masajes",
  },
  DD: {
    name: "Depilación definitiva",
  },
};

// Paso las categorias a un array para poder usar map
export const SERVICE_CATEGORIES_ARRAY = Object.entries(SERVICE_CATEGORY_DICTIONARY).map(
  ([value, data]) => ({
    value,
    ...data,
  })
);
