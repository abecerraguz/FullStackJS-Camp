"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import modulos from "../../../content/modulos.json";
import type { Modulo } from "@/types";

const allModulos = modulos as Modulo[];

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={[
        // Base — mobile: drawer fijo que entra/sale
        "fixed inset-y-0 left-0 z-40 w-64 flex flex-col",
        "border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)]",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: vuelve al flujo como elemento sticky
        "lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:h-screen",
      ].join(" ")}
      aria-label="Navegación de módulos"
    >
      {/* Logo + botón cerrar (mobile) */}
      <div className="px-4 py-5 border-b border-[var(--sidebar-border)] flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={onClose}
        >
          <span className="text-lg font-bold text-lime-700 dark:text-[#c5ff00]">
            FullStack<span className="text-zinc-900 dark:text-white">JS Camp</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
      </div>

      {/* Módulos */}
      <div className="flex-1 p-3 overflow-y-auto">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 px-2 mb-2">
          Módulos
        </p>
        <ul className="space-y-0.5">
          {allModulos.map((m) => {
            const href = `/modulos/${m.slug}`;
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={m.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-md transition-colors ${
                    !m.disponible
                      ? "text-zinc-400 dark:text-zinc-600 cursor-not-allowed pointer-events-none"
                      : active
                      ? "bg-lime-50 text-lime-800 font-medium dark:bg-[#c5ff00]/10 dark:text-[#c5ff00]"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-mono shrink-0 ${
                      active
                        ? "bg-lime-600 text-white dark:bg-[#c5ff00] dark:text-black"
                        : m.disponible
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {m.numero}
                  </span>
                  <span className="truncate">{m.titulo}</span>
                  {!m.disponible && (
                    <span className="ml-auto text-[10px] bg-zinc-200 dark:bg-white/5 text-zinc-500 rounded px-1.5 py-0.5 shrink-0">
                      Pronto
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--sidebar-border)] shrink-0">
        <p className="text-[11px] text-zinc-400 text-center">
          Full Stack JS Camp
        </p>
      </div>
    </nav>
  );
}
