import Link from "next/link";
import { notFound } from "next/navigation";
import { getModulos, getModulo, getTema } from "@/lib/modulos";
import { getTemaContent } from "@/lib/mdx";
import TemasNavigation from "@/components/modulo/TemasNavigation";
import MobileTemasMenu from "@/components/modulo/MobileTemasMenu";
import { ListChecks, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string; tema: string }>;
}

export async function generateStaticParams() {
  return getModulos()
    .filter((m) => m.disponible)
    .flatMap((m) =>
      m.temas.map((t) => ({ slug: m.slug, tema: t.slug }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, tema: temaSlug } = await params;
  const modulo = getModulo(slug);
  const tema = getTema(slug, temaSlug);
  if (!tema) return {};
  const description = `${tema.tipo === "proyecto" ? "Proyecto integrador" : "Tema"} del ${modulo?.titulo ?? "programa Full Stack JS"}: ${tema.titulo}. Duración: ${tema.duracion}.`;
  return {
    title: tema.titulo,
    description,
    openGraph: {
      title: `${tema.titulo} · Full Stack JS`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tema.titulo} · Full Stack JS`,
      description,
    },
  };
}

export default async function TemaPage({ params }: Props) {
  const { slug, tema: temaSlug } = await params;

  const modulo = getModulo(slug);
  if (!modulo) notFound();

  const tema = getTema(slug, temaSlug);
  if (!tema) notFound();

  const { jsx, frontmatter } = await getTemaContent(slug, temaSlug);

  const currentIndex = modulo.temas.findIndex((t) => t.slug === temaSlug);
  const prevTema = currentIndex > 0 ? modulo.temas[currentIndex - 1] : null;
  const nextTema = currentIndex < modulo.temas.length - 1 ? modulo.temas[currentIndex + 1] : null;

  return (
    <div className="flex min-h-full">
      {/* Columna izquierda: navegación de temas del módulo */}
      <aside className="w-52 shrink-0 hidden lg:block border-r border-(--sidebar-border) p-4 sticky top-0 h-full overflow-y-auto">
        <TemasNavigation modulo={modulo} />
      </aside>

      {/* Columna central: contenido del tema */}
      <article className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Navegación de temas — solo visible en mobile */}
        <MobileTemasMenu modulo={modulo} currentTitulo={tema.titulo} />
        {/* Cabecera del tema */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
            <span>Módulo {modulo.numero}</span>
            <span>·</span>
            <span>{tema.tipo}</span>
            <span>·</span>
            <span>{tema.duracion}</span>
          </div>

          {frontmatter.objetivos && frontmatter.objetivos.length > 0 && (
            <details className="not-prose mt-4 rounded-lg border border-lime-300 dark:border-[#c5ff00]/20 overflow-hidden">
              <summary className="px-4 py-3 bg-lime-50 dark:bg-[#c5ff00]/6 text-sm font-medium text-lime-800 dark:text-[#c5ff00] cursor-pointer select-none flex items-center gap-2">
                <ListChecks size={15} aria-hidden="true" />
                Objetivos de aprendizaje
              </summary>
              <ul className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                {frontmatter.objetivos.map((obj, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Check size={14} className="text-lime-600 dark:text-[#c5ff00] shrink-0 mt-0.5" aria-hidden="true" />
                    {obj}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        {/* MDX */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {jsx}
        </div>

        {/* Recursos */}
        {frontmatter.recursos && frontmatter.recursos.length > 0 && (
          <div className="mt-12 not-prose">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Recursos
            </h2>
            <ul className="space-y-2">
              {frontmatter.recursos.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-lime-700 hover:text-lime-900 dark:text-[#c5ff00] dark:hover:text-[#d4ff3a]"
                  >
                    <span>↗</span>
                    {r.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navegación prev / next */}
        {(prevTema || nextTema) && (
          <nav
            aria-label="Navegación entre temas"
            className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 not-prose grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3"
          >
            {prevTema ? (
              <Link
                href={`/modulos/${modulo.slug}/${prevTema.slug}`}
                className="group flex flex-col gap-2 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-[#c5ff00]/50 hover:shadow-md transition-all duration-200"
              >
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-[#c5ff00] transition-colors duration-200">
                  <ChevronLeft size={13} strokeWidth={2.5} />
                  Anterior
                </span>
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                  {prevTema.titulo}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextTema ? (
              <Link
                href={`/modulos/${modulo.slug}/${nextTema.slug}`}
                className="group flex flex-col gap-2 px-5 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-[#c5ff00]/50 hover:shadow-md transition-all duration-200 text-right"
              >
                <span className="flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-[#c5ff00] transition-colors duration-200">
                  Siguiente
                  <ChevronRight size={13} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                  {nextTema.titulo}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
        </div>
      </article>

    </div>
  );
}
