export interface TemaAprendiz {
  id: string;
  id_aprendiz: string;
  id_tema: string;
  nombre_completo?: string;
  cedula?: string;
  nombre_tema?: string;
}
// tema-aprendiz.model.ts
export interface CreateTemaAprendizDto {
  id_aprendiz: number;  // 👈 era string
  id_tema: number;      // 👈 era string
}