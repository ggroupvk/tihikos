export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <article>
        <h1>{slug}</h1>
      </article>
    </main>
  );
}
