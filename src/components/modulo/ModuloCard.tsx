import Link from "next/link";
import type { Modulo } from "@/types";

const TIPO_LABEL: Record<string, string> = {
  teoria: "Teoría",
  practica: "Práctica",
  proyecto: "Proyecto",
};

const TIPO_COLOR: Record<string, string> = {
  teoria:   "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  practica: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  proyecto: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
};

interface Props {
  modulo: Modulo;
}

export default function ModuloCard({ modulo }: Props) {
  return (
    <Link
      href={modulo.disponible ? `/modulos/${modulo.slug}` : "#"}
      className={`group flex flex-col rounded-xl border p-5 transition-all ${
        modulo.disponible
          ? "border-zinc-200 dark:border-white/8 hover:border-lime-400 dark:hover:border-[#c5ff00]/40 hover:shadow-md bg-white dark:bg-white/[0.03]"
          : "border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.015] cursor-not-allowed opacity-50"
      }`}
      aria-disabled={!modulo.disponible}
    >
      {/* Número y duración */}
      <div className="flex items-center justify-between mb-3">
        <span className="w-9 h-9 rounded-lg bg-lime-100 dark:bg-[#c5ff00]/10 text-lime-800 dark:text-[#c5ff00] text-sm font-bold flex items-center justify-center">
          {modulo.numero}
        </span>
        <div className="flex items-center gap-2">
          {!modulo.disponible && (
            <span className="text-[11px] bg-zinc-200 dark:bg-white/8 text-zinc-500 rounded px-2 py-0.5">
              Próximamente
            </span>
          )}
          <span className="text-xs text-zinc-400">{modulo.duracion}</span>
        </div>
      </div>

      {/* Título y descripción */}
      <h3 className="font-semibold text-zinc-900 dark:text-white text-base mb-1 group-hover:text-lime-700 dark:group-hover:text-[#c5ff00] transition-colors">
        {modulo.titulo}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 flex-1">
        {modulo.descripcion}
      </p>

      {/* Stack tecnológico */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {modulo.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-medium bg-zinc-100 dark:bg-white/6 text-zinc-600 dark:text-zinc-300 rounded px-2 py-0.5"
          >
            {tech}
          </span>
        ))}
        {modulo.stack.length > 4 && (
          <span className="text-[11px] text-zinc-400">+{modulo.stack.length - 4}</span>
        )}
      </div>

      {/* Temas */}
      <div className="border-t border-zinc-100 dark:border-white/6 pt-3 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {modulo.temas.slice(0, 3).map((tema) => (
            <span
              key={tema.slug}
              className={`text-[11px] rounded-full px-2 py-0.5 ${TIPO_COLOR[tema.tipo] ?? ""}`}
            >
              {TIPO_LABEL[tema.tipo]}
            </span>
          ))}
          {modulo.temas.length > 3 && (
            <span className="text-[11px] text-zinc-400">
              +{modulo.temas.length - 3} más
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
