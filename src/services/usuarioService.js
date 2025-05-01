//  src/services/usuarioService.js
const API_URL = import.meta.env.VITE_API_URL

export async function fetchUsuarioPorId(id) {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
        },
    });
 
    if (!res.ok) throw new Error("Error al obtener usuario");
    return await res.json();
}