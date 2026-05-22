'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TemasNavigation from './TemasNavigation';
import type { Modulo } from '@/types';

interface Props {
  modulo: Modulo;
  currentTitulo: string;
}

export default function MobileTemasMenu({ modulo, currentTitulo }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        aria-expanded={open}
        aria-label="Temas del módulo"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 shrink-0">
          Temas
        </span>
        <span className="truncate text-left flex-1 text-zinc-700 dark:text-zinc-200">
          {currentTitulo}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-3 py-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <TemasNavigation modulo={modulo} />
        </div>
      )}
    </div>
  );
}
