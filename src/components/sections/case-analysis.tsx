const COPY = {
  el: {
    label: 'Κανονικός σχολιασμός',
    title: 'Από κανονική σκοπιά',
    sections: [
      {
        heading: 'Διαδικαστικά ζητήματα',
        body: 'Η συνοδική απόφαση της 22ας Μαΐου 2025 εκδόθηκε με ψήφους 10 υπέρ και 6 κατά. Ο Μητροπολίτης Τυχικός και η ομάδα του δικηγόρων υποστηρίζουν ότι ορισμένες κατηγορίες δεν εξετάστηκαν σε ξεχωριστές αιτιάσεις, και ότι η σύνθεση της εξεταστικής επιτροπής δεν συνάδει με τους ιερούς κανόνες.',
      },
      {
        heading: 'Ζήτημα ομολογίας',
        body: 'Στο επίκεντρο της υπόθεσης βρίσκονται η άρνηση συλλειτουργίας με την ΟΕΟ-ΠΕΥ, η δημόσια θέση κατά της κοινωνίας με τον ρωμαιοκαθολικισμό και η αντίθεση στην υποχρεωτική σεξουαλική εκπαίδευση. Όλες οι θέσεις έχουν θεολογική και κανονική θεμελίωση.',
      },
      {
        heading: 'Έφεση και Φανάρι',
        body: 'Η Σύνοδος του Οικουμενικού Πατριαρχείου, αναγνωρίζοντας τις διαδικαστικές παρατυπίες, επικύρωσε την καθαίρεση «χάριν της εκκλησιαστικής ειρήνης» στις 17 Οκτωβρίου 2025. Πολλοί κανονολόγοι θεωρούν την απόφαση εσφαλμένη: η ειρήνη της Εκκλησίας δεν επιτυγχάνεται με τη θυσία της κανονικής τάξης.',
      },
    ],
    placeholder:
      'Πλήρης κανονική ανάλυση από τους Πατέρες Καθηγητές κανονικού δικαίου ετοιμάζεται. Αυτή είναι μια προκαταρκτική παρουσίαση των τριών βασικών ζητημάτων.',
  },
  ru: {
    label: 'Канонический разбор',
    title: 'С канонической точки зрения',
    sections: [
      {
        heading: 'Процедурные вопросы',
        body: 'Синодальное решение 22 мая 2025 года было принято голосованием 10 «за» при 6 «против». Митрополит Тихик и его команда юристов утверждают, что отдельные обвинения не рассматривались в отдельных производствах, а состав следственной комиссии не соответствует священным канонам.',
      },
      {
        heading: 'Вопрос исповедания',
        body: 'В центре дела — отказ от сослужения с ПЦУ, публичная позиция против общения с Римо-Католичеством и противодействие обязательному половому воспитанию. Все позиции имеют богословское и каноническое основание.',
      },
      {
        heading: 'Апелляция и Фанар',
        body: 'Синод Вселенского Патриархата, признавая процедурные нарушения, утвердил низложение «ради церковного мира» 17 октября 2025 года. Многие канонисты считают это решение ошибочным: мир Церкви не достигается жертвой канонического порядка.',
      },
    ],
    placeholder:
      'Полный канонический разбор от профессоров канонического права готовится к публикации. Здесь представлено предварительное изложение трёх ключевых вопросов.',
  },
  en: {
    label: 'Canonical commentary',
    title: 'From a canonical standpoint',
    sections: [
      {
        heading: 'Procedural concerns',
        body: 'The synodal decision of 22 May 2025 was adopted by a vote of ten in favour and six against. Metropolitan Tychikos and his legal team argue that individual charges were not examined as separate proceedings, and that the composition of the investigative committee does not conform to the sacred canons.',
      },
      {
        heading: 'The matter of confession',
        body: 'At the heart of the case are the refusal of concelebration with the OCU, public stances against communion with Roman Catholicism, and opposition to mandatory sex education. All positions rest on theological and canonical foundations.',
      },
      {
        heading: 'Appeal and the Phanar',
        body: 'The Synod of the Ecumenical Patriarchate, while acknowledging procedural irregularities, upheld the deposition "for the sake of ecclesiastical peace" on 17 October 2025. Many canonists consider this decision erroneous: the peace of the Church is not achieved by the sacrifice of canonical order.',
      },
    ],
    placeholder:
      'Full canonical analysis by professors of canon law is in preparation. This is a preliminary presentation of the three key issues.',
  },
} as const;

export function CaseAnalysis({ locale }: { locale: string }) {
  const lang = locale as 'el' | 'ru' | 'en';
  const c = COPY[lang];

  return (
    <section className="py-12 md:py-16 bg-[var(--color-paper)] border-t border-[var(--color-hairline)]">
      <div className="mx-auto max-w-[var(--max-width-text)] px-6 md:px-12">
        <span className="kicker text-[var(--color-burgundy)] block mb-3">
          {c.label}
        </span>
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)] text-2xl md:text-3xl tracking-tight mb-8 md:mb-10">
          {c.title}
        </h2>

        <div className="space-y-8 md:space-y-10">
          {c.sections.map((s, i) => (
            <article key={i}>
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[var(--color-ink)] tracking-tight mb-3">
                {s.heading}
              </h3>
              <p className="text-base text-[var(--color-ink-soft)] leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-12 pt-6 border-t border-[var(--color-hairline)] text-sm italic text-[var(--color-ink-muted)] leading-relaxed">
          {c.placeholder}
        </p>
      </div>
    </section>
  );
}
