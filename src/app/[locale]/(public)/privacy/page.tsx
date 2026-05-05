import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { buildPageMetadata } from '@/lib/seo';
import type { SiteLocale } from '@/lib/site';

const COPY = {
  el: {
    kicker: 'Νομικά',
    title: 'Πολιτική ἀπορρήτου',
    subtitle: 'Πῶς συλλέγουμε, ἀποθηκεύουμε καὶ ἐπεξεργαζόμαστε δεδομένα.',
    sections: [
      {
        h: 'Ποιοί εἴμαστε',
        p: 'Ὁ ἱστότοπος tihikos.com ὑπάρχει σὲ στήριξη τοῦ Σεβασμιωτάτου Μητροπολίτη Πάφου Τυχικοῦ. Δὲν εἴμαστε ἐπίσημο ὄργανο τῆς Ἐκκλησίας τῆς Κύπρου. Ὁ ἱστότοπος συντηρεῖται ἀπὸ ἰδιωτικὴ ὁμάδα ἐθελοντῶν. Ἐπικοινωνία: info@tihikos.com.',
      },
      {
        h: 'Δεδομένα ποὺ συλλέγουμε',
        p: 'Συλλέγουμε μόνον τὰ δεδομένα ποὺ μᾶς δίνετε ἑκουσίως μέσῳ τῶν φορμῶν τοῦ ἱστοτόπου: ὑπογραφὴ ἔκκλησης (ὄνομα, ἰδιότητα, χώρα, email, σύντομο μήνυμα) καὶ ἐγγραφὴ σὲ ἐνημερώσεις (μόνο email). Δὲν συλλέγουμε ἄλλα προσωπικὰ στοιχεῖα αὐτόματα.',
      },
      {
        h: 'Cookies',
        p: 'Χρησιμοποιοῦμε μόνον λειτουργικὰ cookies, ἀπολύτως ἀπαραίτητα γιὰ τὴ λειτουργία τοῦ ἱστοτόπου: τὴν ἐπιλεγμένη γλώσσα διεπαφῆς καὶ τὴν αὐθεντικοποίηση στὴ διαχειριστικὴ περιοχή. Δὲν χρησιμοποιοῦμε analytics ἢ διαφημιστικὰ cookies. Δὲν παρακολουθοῦμε τοὺς ἐπισκέπτες σὲ ἄλλους ἱστοτόπους.',
      },
      {
        h: 'Πῶς χρησιμοποιοῦμε τὰ δεδομένα',
        p: 'Τὰ ὀνόματα τῶν ὑπογραφόντων τὴν ἔκκληση ἐνδέχεται νὰ ἐμφανιστοῦν στὸν δημόσιο πίνακα ὑπογραφῶν στὴ σελίδα τῆς ἔκκλησης. Τὰ email χρησιμοποιοῦνται μόνον γιὰ νὰ σᾶς στείλουμε σύντομες ἐνημερώσεις σχετικὰ μὲ τὴν ὑπόθεση. Δὲν τὰ μοιραζόμαστε μὲ τρίτους καὶ δὲν τὰ πωλοῦμε.',
      },
      {
        h: 'Ποῦ ἀποθηκεύονται',
        p: 'Τὰ δεδομένα ἀποθηκεύονται σὲ ὑποδομὴ τῆς Supabase Inc. (Ἡνωμένες Πολιτεῖες). Ἡ ἀποστολὴ email πραγματοποιεῖται μέσῳ τῆς Resend Inc. (Ἡνωμένες Πολιτεῖες). Τὰ δεδομένα μεταφέρονται ἐκτὸς ΕΕ. Ἡ ἐπεξεργασία βασίζεται στὴ συγκατάθεσή σας (ἄρθρο 6(1)(α) GDPR).',
      },
      {
        h: 'Τὰ δικαιώματά σας',
        p: 'Ἔχετε δικαίωμα νὰ ζητήσετε πρόσβαση στὰ δεδομένα σας, διόρθωση, διαγραφή, περιορισμὸ ἢ φορητότητα. Μπορεῖτε ἐπίσης νὰ ἀνακαλέσετε τὴ συγκατάθεσή σας ἀνὰ πᾶσα στιγμή. Ἐπικοινωνῆστε στὸ info@tihikos.com.',
      },
      {
        h: 'Διατήρηση',
        p: 'Διατηροῦμε τὶς ὑπογραφὲς ὅσο διαρκεῖ ἡ ἔκκληση καὶ μέχρι τὴν ὁλοκλήρωση τῆς ὑποθέσεως. Ἐπιφυλάσσεται διατήρηση ὡς ἱστορικὸ ἀρχεῖο μετὰ τὴν ἀνωνυμοποίηση. Οἱ συνδρομὲς newsletter διαγράφονται μὲ τὸ πρῶτο αἴτημά σας.',
      },
      {
        h: 'Ἀλλαγὲς στὴν πολιτική',
        p: 'Τυχὸν ἀλλαγὲς θὰ δημοσιευθοῦν σὲ αὐτὴ τὴ σελίδα μὲ ἐνημερωμένη ἡμερομηνία. Ἡ ἀναθεωρημένη πολιτικὴ ἰσχύει ἀπὸ τὴ στιγμὴ τῆς δημοσίευσης.',
      },
    ],
    updated: 'Τελευταία ἐνημέρωση',
  },
  ru: {
    kicker: 'Юридическое',
    title: 'Политика конфиденциальности',
    subtitle: 'Как мы собираем, храним и обрабатываем данные.',
    sections: [
      {
        h: 'Кто мы',
        p: 'Сайт tihikos.com создан в поддержку Высокопреосвященнейшего митрополита Пафосского Тихика. Мы не являемся официальным органом Кипрской Православной Церкви. Сайт поддерживается частной группой добровольцев. Контакт: info@tihikos.com.',
      },
      {
        h: 'Какие данные мы собираем',
        p: 'Мы собираем только те данные, которые вы передаёте нам добровольно через формы сайта: подпись под обращением (имя, должность/сан, страна, email, краткое сообщение) и подписка на сводки (только email). Иные персональные данные автоматически не собираются.',
      },
      {
        h: 'Cookies',
        p: 'Мы используем только функциональные cookies, абсолютно необходимые для работы сайта: выбранный язык интерфейса и авторизация в административной области. Аналитические и рекламные cookies не используются. Мы не отслеживаем посетителей на других сайтах.',
      },
      {
        h: 'Как мы используем данные',
        p: 'Имена подписавших обращение могут отображаться в открытом списке подписей на странице обращения. Email используются только для отправки кратких сводок по делу. Мы не передаём их третьим сторонам и не продаём.',
      },
      {
        h: 'Где данные хранятся',
        p: 'Данные хранятся в инфраструктуре Supabase Inc. (США). Отправка писем — через Resend Inc. (США). Данные передаются за пределы ЕС. Обработка основана на вашем согласии (ст. 6(1)(а) GDPR).',
      },
      {
        h: 'Ваши права',
        p: 'У вас есть право запросить доступ к данным, исправление, удаление, ограничение или перенос. Вы также можете отозвать согласие в любой момент. Пишите на info@tihikos.com.',
      },
      {
        h: 'Срок хранения',
        p: 'Подписи под обращением хранятся в течение действия обращения и до завершения дела. После этого данные могут сохраняться как исторический архив в анонимизированном виде. Подписки на сводки удаляются по первому запросу.',
      },
      {
        h: 'Изменения политики',
        p: 'Любые изменения публикуются на этой странице с указанием актуальной даты. Обновлённая политика действует с момента публикации.',
      },
    ],
    updated: 'Последнее обновление',
  },
  en: {
    kicker: 'Legal',
    title: 'Privacy policy',
    subtitle: 'How we collect, store and process data.',
    sections: [
      {
        h: 'Who we are',
        p: 'tihikos.com exists in support of His Eminence Metropolitan Tychikos of Paphos. We are not an official organ of the Church of Cyprus. The site is maintained by a private team of volunteers. Contact: info@tihikos.com.',
      },
      {
        h: 'Data we collect',
        p: 'We collect only data you give us voluntarily through the site forms: signing the appeal (name, position/rank, country, email, brief message) and the newsletter subscription (email only). No other personal data is collected automatically.',
      },
      {
        h: 'Cookies',
        p: 'We use only functional cookies that are strictly necessary for the site to work: the chosen interface language and admin-area authentication. We do not use analytics or advertising cookies. We do not track visitors across other sites.',
      },
      {
        h: 'How we use data',
        p: 'Signatories\' names may appear in the public signature list on the appeal page. Email addresses are used only to send concise updates about the case. We do not share them with third parties and do not sell them.',
      },
      {
        h: 'Where data is stored',
        p: 'Data is stored in Supabase Inc. infrastructure (United States). Email delivery uses Resend Inc. (United States). Data is transferred outside the EU. Processing is based on your consent (Article 6(1)(a) GDPR).',
      },
      {
        h: 'Your rights',
        p: 'You have the right to request access to your data, correction, deletion, restriction or portability. You may also withdraw consent at any time. Contact info@tihikos.com.',
      },
      {
        h: 'Retention',
        p: 'Appeal signatures are kept for the duration of the appeal and until the case concludes. After that, data may be retained as a historical archive in anonymised form. Newsletter subscriptions are deleted on your first request.',
      },
      {
        h: 'Changes to this policy',
        p: 'Any changes will be published on this page with an updated date. The revised policy takes effect from the moment of publication.',
      },
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
    path: '/privacy',
    title: t.title,
    description: t.subtitle,
  });
}

export default async function PrivacyPage({
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
