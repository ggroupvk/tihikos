interface Props {
  kicker: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ kicker, title, subtitle }: Props) {
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-paper)] pt-32 md:pt-40 pb-12 md:pb-16 border-b border-[var(--color-hairline-dark)]">
      <div className="mx-auto max-w-[var(--max-width-wide)] px-6 md:px-12">
        <span className="kicker text-[var(--color-gold-bright)] block mb-4">{kicker}</span>
        <h1 className="font-[family-name:var(--font-heading)] font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 md:mt-6 text-base md:text-lg text-[var(--color-paper)]/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
