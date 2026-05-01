const COPY = {
  el: {
    label: 'Βιογραφία',
    title: 'Από τη Μέσανα στην Πάφο',
    sections: [
      {
        period: '1981 — 1999',
        heading: 'Πρώτα έτη',
        body: 'Γεννήθηκε στις 8 Δεκεμβρίου 1981 στο χωριό Μέσανα της επαρχίας Πάφου. Μεγάλωσε σε εκκλησιαστική οικογένεια, υπηρετώντας από νεαρή ηλικία στην ενορία του.',
      },
      {
        period: '1999 — 2007',
        heading: 'Σπουδές και μοναχική κουρά',
        body: 'Σπούδασε θεολογία στη Θεολογική Σχολή του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Στη συνέχεια εκάρη μοναχός και χειροτονήθηκε διάκονος.',
      },
      {
        period: '2007 — 2023',
        heading: 'Διακονία ως αρχιμανδρίτης',
        body: 'Υπηρέτησε ως αρχιμανδρίτης στην Ι. Μητρόπολη Πάφου. Διηύθυνε σειρά εκκλησιαστικών διοργανώσεων, συγκρότησε κατηχητικά σχολεία και μοναστικές αδελφότητες.',
      },
      {
        period: '2023',
        heading: 'Εκλογή και ενθρόνιση',
        body: 'Στις 23 Φεβρουαρίου 2023 εκλέγεται 70ός Μητροπολίτης Πάφου από την Ιερά Σύνοδο της Εκκλησίας Κύπρου. Ενθρονίζεται στις 12 Μαρτίου 2023 στον Καθεδρικό Ναό του Αγίου Θεοδώρου.',
      },
      {
        period: '2025 — σήμερα',
        heading: 'Καθαίρεση και έφεση',
        body: 'Στις 22 Μαΐου 2025 η Σύνοδος αποφασίζει την καθαίρεσή του. Ο Μητροπολίτης διαμένει σήμερα στο Άγιον Όρος, παραμένοντας στην κανονικά ορισμένη θέση του.',
      },
    ],
    placeholder:
      'Πλήρης εκτενής βιογραφία με συμπληρωματικές πηγές και αναφορές προστίθεται.',
  },
  ru: {
    label: 'Биография',
    title: 'От Месаны до Пафоса',
    sections: [
      {
        period: '1981 — 1999',
        heading: 'Ранние годы',
        body: 'Родился 8 декабря 1981 года в деревне Месана, округа Пафос. Вырос в церковной семье, с раннего возраста служил в приходской церкви.',
      },
      {
        period: '1999 — 2007',
        heading: 'Образование и постриг',
        body: 'Окончил богословский факультет Аристотелевского университета в Салониках. Принял монашеский постриг, рукоположен во диакона.',
      },
      {
        period: '2007 — 2023',
        heading: 'Служение архимандритом',
        body: 'Служил архимандритом в Пафосской митрополии. Руководил церковными инициативами, организовывал катехизические школы и монашеские братства.',
      },
      {
        period: '2023',
        heading: 'Избрание и интронизация',
        body: '23 февраля 2023 года избран 70-м митрополитом Пафосским Священным Синодом Кипрской Церкви. Интронизован 12 марта 2023 года в кафедральном соборе Святого Феодора.',
      },
      {
        period: '2025 — настоящее время',
        heading: 'Низложение и апелляция',
        body: '22 мая 2025 года Синод постановил низложить митрополита. В настоящее время Тихик пребывает на Святой Горе Афон, оставаясь в своей канонически утверждённой кафедре.',
      },
    ],
    placeholder:
      'Полная развёрнутая биография с дополнительными источниками и ссылками будет добавлена.',
  },
  en: {
    label: 'Biography',
    title: 'From Mesana to Paphos',
    sections: [
      {
        period: '1981 — 1999',
        heading: 'Early years',
        body: 'Born on 8 December 1981 in the village of Mesana, Paphos district. Grew up in an ecclesiastical family, serving in his parish church from a young age.',
      },
      {
        period: '1999 — 2007',
        heading: 'Studies and monastic tonsure',
        body: 'Studied theology at the Faculty of Theology of Aristotle University of Thessaloniki. Took monastic vows and was ordained a deacon.',
      },
      {
        period: '2007 — 2023',
        heading: 'Ministry as archimandrite',
        body: 'Served as archimandrite in the Metropolis of Paphos. Led numerous ecclesiastical initiatives, established catechetical schools and monastic brotherhoods.',
      },
      {
        period: '2023',
        heading: 'Election and enthronement',
        body: 'On 23 February 2023 elected 70th Metropolitan of Paphos by the Holy Synod of the Church of Cyprus. Enthroned on 12 March 2023 at the Holy Cathedral of Saint Theodoros.',
      },
      {
        period: '2025 — present',
        heading: 'Deposition and appeal',
        body: 'On 22 May 2025 the Synod resolved to depose him. The Metropolitan currently resides at Mount Athos, remaining in his canonically lawful office.',
      },
    ],
    placeholder:
      'A full extended biography with additional sources and references will be added.',
  },
} as const;

export function AboutBio({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-[var(--max-width-content)] px-6 md:px-12">
        <span className="kicker text-[var(--color-burgundy)] block mb-3">
          {c.label}
        </span>
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight mb-10 md:mb-12">
          {c.title}
        </h2>

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          {/* Vertical timeline rail */}
          <div className="hidden md:block md:col-span-1 relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[var(--color-burgundy)]/20" />
          </div>

          <div className="col-span-12 md:col-span-11">
            <ol className="space-y-8 md:space-y-10">
              {c.sections.map((s, i) => (
                <li
                  key={i}
                  className="relative pb-8 md:pb-10 border-b border-[var(--color-hairline)] last:border-b-0"
                >
                  <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
                    <div className="col-span-12 md:col-span-3">
                      <p className="kicker text-[var(--color-burgundy)] mb-2">
                        {s.period}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] tracking-tight mb-2.5">
                        {s.heading}
                      </h3>
                      <p className="text-base text-[var(--color-ink-soft)] leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-10 text-sm italic text-[var(--color-ink-muted)]">
          {c.placeholder}
        </p>
      </div>
    </section>
  );
}
