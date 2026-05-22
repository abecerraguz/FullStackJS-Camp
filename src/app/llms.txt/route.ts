import { getModulos } from "@/lib/modulos";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack.factorit.cl";

  const modulos = getModulos();
  const totalTemas = modulos.reduce((acc, m) => acc + m.temas.length, 0);
  const modulosDisponibles = modulos.filter((m) => m.disponible);

  const lines: string[] = [
    `# FullStackJS Camp`,
    ``,
    `> Programa formativo de nivel Trainee para Desarrollo de Aplicaciones Full Stack JavaScript.`,
    `> ${modulos.length} módulos, ${totalTemas} temas. Desde algoritmos y HTML hasta React, Next.js, Node.js, PostgreSQL y Docker.`,
    ``,
    `## Módulos`,
    ...modulos.map(
      (m) =>
        `- [${m.titulo}](${baseUrl}/modulos/${m.slug}): ${m.descripcion} Stack: ${m.stack.join(", ")}. Duración: ${m.duracion}.`
    ),
  ];

  if (modulosDisponibles.length > 0) {
    lines.push(``);
    lines.push(`## Temas disponibles`);
    for (const modulo of modulosDisponibles) {
      lines.push(``);
      lines.push(`### ${modulo.titulo}`);
      for (const tema of modulo.temas) {
        lines.push(
          `- [${tema.titulo}](${baseUrl}/modulos/${modulo.slug}/${tema.slug}): ${tema.tipo}, duración ${tema.duracion}.`
        );
      }
    }
  }

  lines.push(``);
  lines.push(`## Información general`);
  lines.push(`- Idioma: Español`);
  lines.push(`- Nivel: Trainee`);
  lines.push(`- Modalidad: Online`);
  lines.push(
    `- Tecnologías principales: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Docker`
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
