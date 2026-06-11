export interface Aprendiz {
  id: string;
  cedula: string;
  nombre_completo: string;
  fecha_nacimiento: string;
}
export interface CreateAprendizDto {
  cedula: string;
  nombre_completo: string;
  fecha_nacimiento: string;
}
export interface UpdateAprendizDto {
  cedula?: string;
  nombre_completo?: string;
  fecha_nacimiento?: string;
}