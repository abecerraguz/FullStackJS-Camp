export interface Tema {
  slug: string;
  titulo: string;
  tipo: "teoria" | "practica" | "proyecto";
  duracion: string;
}

export interface Modulo {
  slug: string;
  numero: number;
  titulo: string;
  descripcion: string;
  temas: Tema[];
  stack: string[];
  duracion: string;
  disponible: boolean;
}

export interface MDXFrontmatter {
  titulo?: string;
  descripcion?: string;
  tipo?: "teoria" | "practica" | "proyecto";
  objetivos?: string[];
  conceptosClave?: string[];
  recursos?: { nombre: string; url: string }[];
  duracion?: string;
  modulo?: number;
}
