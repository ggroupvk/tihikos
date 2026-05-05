import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { buildPageMetadata } from '@/lib/seo';
import type { SiteLocale } from '@/lib/site';

const COPY = {
  el: {
    kicker: 'Νομικά',
    title: 'Ὅροι χρήσης',
    subtitle: 'Ὅροι ποὺ ρυθμίζουν τὴ χρήση τοῦ ἱστοτόπου.',
    sections: [
      { h: 'Φύση τοῦ ἱστοτόπου', p: 'Ὁ tihikos.com εἶναι ἀνεπίσημος ἱστότοπος σὲ στήριξη τοῦ Σεβασμιωτάτου Μητροπολίτη Πάφου Τυχικοῦ. Δὲν ἐκπροσωπεῖ τὴν Ἐκκλησία τῆς Κύπρου, τὴν Ἱερὰ Μητρόπολη Πάφου, οὔτε τὸν ἴδιο τὸν Μητροπολίτη.' },
      { h: 'Πνευματικὴ ἰδιοκτησία', p: 'Τὰ κείμενα ποὺ συντάσσει ἡ ὁμάδα τοῦ ἱστοτόπου διατίθενται γιὰ μὴ ἐμπορικὴ χρήση μὲ ἀναφορὰ τῆς πηγῆς. Τὰ ξένα ἄρθρα, φωτογραφίες καὶ βίντεο παραμένουν ἰδιοκτησία τῶν ἀρχικῶν δημιουργῶν, μὲ ἀναφορὰ καὶ σύνδεσμο στὴν πρωτότυπη πηγή.' },
      { h: 'Σύνδεσμοι σὲ τρίτους', p: 'Ὁ ἱστότοπος περιέχει συνδέσμους σὲ ἐξωτερικὲς πηγές. Δὲν φέρουμε εὐθύνη γιὰ τὸ περιεχόμενο, τὶς πολιτικὲς ἀπορρήτου ἢ τὶς πρακτικὲς αὐτῶν τῶν ἱστοτόπων.' },
      { h: 'Περιορισμὸς εὐθύνης', p: 'Τὸ περιεχόμενο παρέχεται «ὡς ἔχει» γιὰ ἐνημερωτικοὺς σκοποὺς. Παρ\' ὅλο ποὺ καταβάλλουμε εὔλογη προσπάθεια γιὰ ἀκρίβεια, δὲν ἐγγυόμαστε ὅτι κάθε λεπτομέρεια εἶναι ἀκριβὴς ἢ ἐπίκαιρη. Καμία πληροφορία δὲν συνιστᾶ νομικὴ ἢ κανονικὴ συμβουλή.' },
      { h: 'Ἀλλαγὲς στοὺς ὅρους', p: 'Ἐπιφυλάσσουμε τὸ δικαίωμα νὰ τροποποιοῦμε αὐτοὺς τοὺς ὅρους ἀνὰ πᾶσα στιγμή. Ἡ τρέχουσα ἔκδοση ἰσχύει ἀπὸ τὴν ἡμερομηνία ποὺ ἀναγράφεται.' },
      { h: 'Ἐπικοινωνία', p: 'Γιὰ ὁποιοδήποτε ζήτημα: info@tihikos.com.' },
    ],
    updated: 'Τελευταία ἐνημέρωση',
  },
  ru: {
    kicker: 'Юридическое',
    title: 'Условия использования',
    subtitle: 'Условия, регулирующие использование сайта.',
    sections: [
      { h: 'Природа сайта', p: 'tihikos.com — неофициальный сайт в поддержку Высокопреосвященнейшего митрополита Пафосского Тихика. Сайт не представляет Кипрскую Православную Церковь, Пафосскую митрополию или самого митрополита.' },
      { h: 'Авторские права', p: 'Тексты, написанные командой сайта, доступны для некоммерческого использования с указанием источника. Сторонние статьи, фотографии и видео остаются собственностью их авторов; используются с указанием источника и ссылкой на оригинал.' },
      { h: 'Внешние ссылки', p: 'Сайт содержит ссылки на сторонние ресурсы. Мы не несём ответственности за их содержание, политику конфиденциальности или практики обработки данных.' },
      { h: 'Ограничение ответственности', p: 'Содержимое предоставляется «как есть» в информационных целях. Мы прилагаем разумные усилия для точности, но не гарантируем, что каждая деталь верна или актуальна. Ничто из опубликованного не является юридической или канонической консультацией.' },
      { h: 'Изменения условий', p: 'Мы оставляем за собой право изменять данные условия в любое время. Текущая редакция действует с указанной даты.' },
      { h: 'Связь', p: 'По любым вопросам: info@tihikos.com.' },
    ],
    updated: 'Последнее обновление',
  },
  en: {
    kicker: 'Legal',
    title: 'Terms of use',
    subtitle: 'Terms governing your use of this site.',
    sections: [
      { h: 'Nature of the site', p: 'tihikos.com is an unofficial site in support of His Eminence Metropolitan Tychikos of Paphos. The site does not represent the Church of Cyprus, the Holy Metropolis of Paphos, or the Metropolitan himself.' },
      { h: 'Intellectual property', p: 'Texts written by the site team are available for non-commercial use with attribution. Third-party articles, photographs and videos remain the property of their original creators; they are used with attribution and a link to the original source.' },
      { h: 'External links', p: 'The site contains links to external resources. We are not responsible for their content, privacy policies or data-handling practices.' },
      { h: 'Disclaimer of liability', p: 'Content is provided "as is" for informational purposes. While we make reasonable efforts to ensure accuracy, we do not guarantee that every detail is correct or up to date. Nothing published constitutes legal or canonical advice.' },
      { h: 'Changes to these terms', p: 'We reserve the right to amend these terms at any time. The current version applies from the date shown.' },
      { h: 'Contact', p: 'For any questions: info@tihikos.com.' },
    ],
    updated: 'Last updated',
  },
} as const;

const UPDATED_AT = '2026-05-05';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = COPY[locale as SiteLocale];
  return buildPageMetadata({
    locale: locale as SiteLocale,
    path: '/terms',
    title: t.title,
    description: t.subtitle,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  return (
    <main>
      <PageHeader kicker={c.kicker} title={c.title} subtitle={c.subtitle} />
      <article className="bg-[var(--color-paper)] py-12 md:py-16">
        <div className="mx-auto max-w-[var(--max-width-text)] px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-10">
            {c.updated}: {UPDATED_AT}
          </p>
          <div className="space-y-9 md:space-y-10">
            {c.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] tracking-tight mb-3">
                  {section.h}
                </h2>
                <p className="text-base text-[var(--color-ink-soft)] leading-relaxed">
                  {section.p}
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
