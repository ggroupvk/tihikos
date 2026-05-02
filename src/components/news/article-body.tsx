type ParaKind = 'lead' | 'heading' | 'pullquote' | 'regular';

const QUOTE_OPENS = /^[«""„"](?!.{0,3}$)/;
const HEADING_PREFIX = /^(?:Part|Часть|Μέρος|Section)\s+/i;

function isHeading(text: string): boolean {
  const t = text.trim();
  if (t.length === 0 || t.length > 90) return false;
  // Anything ending with a sentence terminator is not a heading.
  if (/[.!?:;)]$/.test(t)) return false;
  // Strong signal: explicit "Part / Часть / Μέρος" prefix, or a short
  // line ending in nothing — treat as a heading.
  if (HEADING_PREFIX.test(t)) return true;
  // Short standalone phrase without terminal punctuation = heading-y.
  if (t.length <= 70) return true;
  return false;
}

function isPullQuote(text: string): boolean {
  const t = text.trim();
  if (t.length < 50) return false;
  return QUOTE_OPENS.test(t);
}

function classify(text: string, idx: number): ParaKind {
  if (idx === 0) return 'lead';
  if (isHeading(text)) return 'heading';
  if (isPullQuote(text)) return 'pullquote';
  return 'regular';
}

export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="article-body">
      {paragraphs.map((para, i) => {
        const kind = classify(para, i);

        if (kind === 'lead') {
          return (
            <p key={i} className="lead">
              {para}
            </p>
          );
        }

        if (kind === 'heading') {
          // Insert an ornament break before each heading except the very
          // first one (right after lead) — separates major sections.
          const prevWasHeading =
            i >= 1 && classify(paragraphs[i - 1], i - 1) === 'heading';
          const ornament =
            i > 1 && !prevWasHeading ? (
              <p className="ornament" aria-hidden>
                · · ·
              </p>
            ) : null;
          return (
            <div key={i}>
              {ornament}
              <h2 className="subhead">{para}</h2>
            </div>
          );
        }

        if (kind === 'pullquote') {
          return (
            <blockquote key={i} className="pullquote">
              {para}
            </blockquote>
          );
        }

        return <p key={i}>{para}</p>;
      })}
    </div>
  );
}
