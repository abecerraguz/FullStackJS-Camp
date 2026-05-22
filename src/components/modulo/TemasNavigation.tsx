"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Terminal, Rocket, FileText } from "lucide-react";
import type { Modulo } from "@/types";

type IconComponent = typeof BookOpen;

const TIPO_ICON: Record<string, IconComponent> = {
  teoria: BookOpen,
  practica: Terminal,
  proyecto: Rocket,
};

interface Props {
  modulo: Modulo;
}

export default function TemasNavigation({ modulo }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label="Temas del módulo">
      <div className="mb-4">
        <Link
          href={`/modulos/${modulo.slug}`}
          className={`flex items-center gap-2 text-sm font-medium mb-3 transition-colors ${
            pathname === `/modulos/${modulo.slug}`
              ? "text-lime-700 dark:text-[#c5ff00]"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          ← Módulo {modulo.numero}
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2 px-1">
          Temas
        </p>
      </div>

      <ul className="space-y-0.5">
        {modulo.temas.map((tema) => {
          const href = `/modulos/${modulo.slug}/${tema.slug}`;
          const active = pathname === href;

          return (
            <li key={tema.slug}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-lime-50 text-lime-800 font-medium dark:bg-[#c5ff00]/10 dark:text-[#c5ff00]"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {(() => {
                    const Icon = TIPO_ICON[tema.tipo] ?? FileText;
                    const iconColor = active
                      ? "text-lime-700 dark:text-[#c5ff00]"
                      : "text-zinc-500 dark:text-lime-600";
                    return <Icon size={13} className={`shrink-0 mt-0.75 ${iconColor}`} aria-hidden="true" />;
                  })()}
                  <div>
                    <span className="block leading-snug">{tema.titulo} <small className="text-[11px] text-zinc-800 dark:text-zinc-400">{tema.duracion}</small></span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
