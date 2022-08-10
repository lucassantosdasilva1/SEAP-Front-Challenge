import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3333`
})

export default api;

// export async function getDetento() {
//   const result = await api.get("/detento")
//   console.log(result.data);
// };

// export async function getAtendimento() {
//   const result = await api.get("/atendimento")
//   console.log(result.data);
// };

// export async function getTipoAtendimento() {
//   const result = await api.get("/tipoAtendimento")
//   console.log(result.data);
// };