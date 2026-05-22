import modulosData from "../../content/modulos.json";
import type { Modulo, Tema } from "@/types";

export function getModulos(): Modulo[] {
  return modulosData as Modulo[];
}

export function getModulo(slug: string): Modulo | undefined {
  return (modulosData as Modulo[]).find((m) => m.slug === slug);
}

export function getTema(moduloSlug: string, temaSlug: string): Tema | undefined {
  const modulo = getModulo(moduloSlug);
  return modulo?.temas.find((t) => t.slug === temaSlug);
}
