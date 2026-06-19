export interface Tip {
  tips: number;
  detalle: string;
}

export interface Tema {
  id: string;
  nombre_tema: string;
  tips?: Tip[] | null;
}

export interface TipsResponse {
  tema: Tema;
  tips: Tip[];
}

export interface CreateTemaDto {
  nombre_tema: string;
}

export interface UpdateTemaDto {
  nombre_tema?: string;
}
