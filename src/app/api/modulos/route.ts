import { NextResponse } from "next/server";
import { getModulos } from "@/lib/modulos";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim();

  const modulos = getModulos();

  const result = q
    ? modulos.filter(
        (m) =>
          m.titulo.toLowerCase().includes(q) ||
          m.descripcion.toLowerCase().includes(q)
      )
    : modulos;

  return NextResponse.json({ data: result, total: result.length });
}
