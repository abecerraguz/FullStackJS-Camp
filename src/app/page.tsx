import ModuloCard from "@/components/modulo/ModuloCard";
import { getModulos } from "@/lib/modulos";

export default function HomePage() {
  const modulos = getModulos();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-lime-700 dark:text-[#c5ff00] mb-2">
          FullStackJS Camp · 2026
        </span>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Desarrollo de Aplicaciones<br />Full Stack JavaScript
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl leading-relaxed">
          Programa formativo de nivel Trainee. Desde fundamentos de HTML y JavaScript hasta
          despliegue de aplicaciones con React, Next.js, Node.js, PostgreSQL y Docker.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">9</span>
            <span className="text-zinc-400 ml-1">módulos</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">
              {modulos.reduce((acc, m) => acc + m.temas.length, 0)}
            </span>
            <span className="text-zinc-400 ml-1">temas</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-900 dark:text-white text-lg">
              {modulos.filter((m) => m.disponible).length}
            </span>
            <span className="text-zinc-400 ml-1">módulos disponibles</span>
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulos.map((modulo) => (
          <ModuloCard key={modulo.slug} modulo={modulo} />
        ))}
      </div>
    </div>
  );
}
