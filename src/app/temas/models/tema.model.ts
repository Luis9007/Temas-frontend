export interface Tema {
  id: string;
  nombre_tema: string;
}

export interface CreateTemaDto {
  nombre_tema: string;
}

export interface UpdateTemaDto {
  nombre_tema?: string;
}