import { notFound } from "next/navigation";
import { getModulos, getModulo } from "@/lib/modulos";
import { getModuloContent } from "@/lib/mdx";
import TemasNavigation from "@/components/modulo/TemasNavigation";
import MobileTemasMenu from "@/components/modulo/MobileTemasMenu";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getModulos().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return {};
  return {
    title: `${modulo.titulo} · Full Stack JS`,
    description: modulo.descripcion,
  };
}

export default async function ModuloPage({ params }: Props) {
  const { slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) notFound();

  const { jsx } = await getModuloContent(slug);

  return (
    <div className="flex min-h-full">
      {/* Sidebar de temas (si el módulo está disponible y tiene temas) */}
      {modulo.disponible && modulo.temas.length > 0 && (
        <aside className="w-52 shrink-0 hidden lg:block border-r border-zinc-200 dark:border-zinc-800 p-4 sticky top-0 h-full overflow-y-auto">
          <TemasNavigation modulo={modulo} />
        </aside>
      )}

      {/* Contenido MDX */}
      <article className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {/* Navegación de temas — solo visible en mobile */}
        {modulo.disponible && modulo.temas.length > 0 && (
          <MobileTemasMenu modulo={modulo} currentTitulo={`Módulo ${modulo.numero}`} />
        )}
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
          <span>Módulo {modulo.numero}</span>
          {modulo.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="ml-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {jsx}
        </div>
        </div>
      </article>
    </div>
  );
}
