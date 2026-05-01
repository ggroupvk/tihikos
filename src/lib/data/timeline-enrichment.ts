/**
 * Timeline event enrichment — long-form body text and related document
 * slugs for the homepage chronicle accordion.
 *
 * Lives in code until migration 00002_timeline_extras.sql is applied
 * to Supabase and the data is seeded into timeline_events.body_*
 * and timeline_events.related_doc_slugs. After that this file should
 * be retired and the query updated to read from the DB.
 *
 * Keyed by `sort_order` (stable across seeds; uuid `id` would change).
 */

export type TimelineEnrichment = {
  body_el: string;
  body_ru: string;
  body_en: string;
  related_doc_slugs: readonly string[];
};

export const TIMELINE_ENRICHMENT: Record<number, TimelineEnrichment> = {
  1: {
    body_el:
      'Στις 23 Φεβρουαρίου 2023 η Ιερά Σύνοδος της Εκκλησίας Κύπρου εκλέγει τον Αρχιμανδρίτη Τυχικό Βρυώνη ως 70ό Μητροπολίτη Πάφου. Η εκλογή του ολοκληρώνει σχεδόν δύο μήνες κανονικής διαδικασίας μετά την κένωση της Μητρόπολης. Η εκλογή γίνεται με ευρύτατη συναίνεση των ιεραρχών.',
    body_ru:
      '23 февраля 2023 года Священный Синод Кипрской Церкви избирает архимандрита Тихикоса Вриониса 70-м митрополитом Пафосским. Избрание завершает почти двухмесячную каноническую процедуру после освобождения кафедры. Голосование проходит при широком согласии иерархов.',
    body_en:
      'On 23 February 2023 the Holy Synod of the Church of Cyprus elects Archimandrite Tychikos Vryonis as the 70th Metropolitan of Paphos. The election concludes nearly two months of canonical procedure following the vacancy of the see. The vote passes with broad concord among the hierarchs.',
    related_doc_slugs: ['consecration'],
  },
  2: {
    body_el:
      'Στις 12 Μαρτίου 2023 ο νεοεκλεγείς Μητροπολίτης ενθρονίζεται στον Ιερό Καθεδρικό Ναό του Αγίου Θεοδώρου στην Πάφο, λαμβάνοντας τον τίτλο «Μητροπολίτης Πάφου, Έξαρχος Αρσινόης και Ρωμαίας». Η τελετή πραγματοποιείται με συμμετοχή πολυάριθμων ιεραρχών της Κύπρου και της Ελλάδος.',
    body_ru:
      '12 марта 2023 года новоизбранный митрополит интронизуется в кафедральном соборе Святого Феодора в Пафосе, получая титул «Митрополит Пафосский, экзарх Арсинои и Ромеи». В церемонии участвует множество иерархов Кипра и Греции.',
    body_en:
      'On 12 March 2023 the newly-elected Metropolitan is enthroned at the Holy Cathedral of Saint Theodoros in Paphos, receiving the title "Metropolitan of Paphos, Exarch of Arsinoi and Romaia." The ceremony is attended by numerous hierarchs from Cyprus and Greece.',
    related_doc_slugs: ['enthronement-2023'],
  },
  3: {
    body_el:
      'Πρώτη δημόσια ρήξη με τον Αρχιεπίσκοπο Γεώργιο Γ′. Ο Μητροπολίτης Τυχικός αρνείται να συλλειτουργήσει εξαιτίας της θέσης του Αρχιεπισκόπου περί κοινωνίας με την Ορθόδοξη Εκκλησία της Ουκρανίας (ΟΕΟ-ΠΕΥ). Η διαφωνία γίνεται ανοιχτή.',
    body_ru:
      'Первая публичная конфронтация с Архиепископом Георгием III. Митрополит Тихикос отказывается от сослужения из-за позиции Архиепископа по общению с ПЦУ. Разногласие становится открытым.',
    body_en:
      'First public confrontation with Archbishop George III. Metropolitan Tychikos refuses concelebration over the Archbishop\'s position on communion with the Orthodox Church of Ukraine (OCU). The disagreement becomes open.',
    related_doc_slugs: [],
  },
  4: {
    body_el:
      'Ομάδα ιεραρχών διατυπώνει σειρά κατηγοριών εναντίον του Μητροπολίτη Τυχικού: χειροτονία ιερέα μη μνημονεύοντος, άρνηση τέλεσης γάμου, δημόσιες θέσεις κατά του ρωμαιοκαθολικισμού και υποχρεωτικής σεξουαλικής εκπαίδευσης. Οι κατηγορίες προετοιμάζουν την συνοδική εξέταση.',
    body_ru:
      'Группа иерархов формулирует ряд обвинений против митрополита Тихикоса: рукоположение непоминающего клирика, отказ в венчании, публичная критика католицизма и обязательного полового воспитания. Обвинения готовят синодальное рассмотрение.',
    body_en:
      'A group of hierarchs lodges a series of accusations against Metropolitan Tychikos: ordaining a non-commemorating cleric, refusing a wedding ceremony, public stances against Roman Catholicism and mandatory sex education. The charges set the stage for synodal review.',
    related_doc_slugs: [],
  },
  5: {
    body_el:
      'Στις 22 Μαΐου 2025 η Ιερά Σύνοδος της Εκκλησίας Κύπρου, με ψήφους 10 υπέρ και 6 κατά, αποφασίζει την καθαίρεση του Μητροπολίτη Τυχικού από την επισκοπική του διακονία στην Πάφο. Διατηρεί τον αρχιερατικό βαθμό. Η απόφαση προκαλεί διεθνή αντίδραση.',
    body_ru:
      '22 мая 2025 года Священный Синод Кипрской Церкви голосованием 10 «за» при 6 «против» постановил низложить митрополита Тихикоса с управления Пафосской митрополией. Архиерейский сан сохранён. Решение вызывает международную реакцию.',
    body_en:
      'On 22 May 2025 the Holy Synod of the Church of Cyprus, by ten votes to six, deposes Metropolitan Tychikos from the episcopal administration of Paphos. The episcopal rank is retained. The decision provokes international reaction.',
    related_doc_slugs: ['synod-decision-2025'],
  },
  6: {
    body_el:
      'Ο Μητροπολίτης Τυχικός εκδίδει επίσημη απάντηση: «Σέβομαι την απόφαση της Ιεράς Συνόδου» — αλλά δηλώνει ότι παραμένει στην κανονικά ορισμένη του θέση και ετοιμάζει έφεση στο Οικουμενικό Πατριαρχείο. Δηλώνει πιστότητα στην Εκκλησία και τους Πατέρες.',
    body_ru:
      'Митрополит Тихикос издаёт официальный ответ: «Уважаю решение Священного Синода» — но заявляет, что остаётся на своей канонически утверждённой кафедре и готовит апелляцию во Вселенский Патриархат. Декларирует верность Церкви и Отцам.',
    body_en:
      'Metropolitan Tychikos issues an official response: "I respect the decision of the Holy Synod" — yet declares that he remains on his canonically lawful cathedra and is preparing an appeal to the Ecumenical Patriarchate. He affirms fidelity to the Church and the Fathers.',
    related_doc_slugs: ['tychikos-response'],
  },
  7: {
    body_el:
      'Στις 17 Οκτωβρίου 2025 η Σύνοδος του Οικουμενικού Πατριαρχείου, αναγνωρίζοντας μεν ορισμένες διαδικαστικές παρατυπίες, επικυρώνει την καθαίρεση «χάριν της εκκλησιαστικής ειρήνης». Η απόφαση κρίνεται από πολλούς αμφιλεγόμενη κανονικά.',
    body_ru:
      '17 октября 2025 года Синод Вселенского Патриархата, признавая некоторые процедурные нарушения, утверждает низложение «ради церковного мира». Решение многими признано канонически спорным.',
    body_en:
      'On 17 October 2025 the Synod of the Ecumenical Patriarchate, while acknowledging certain procedural irregularities, upholds the deposition "for the sake of ecclesiastical peace." Many regard the decision as canonically contested.',
    related_doc_slugs: ['patriarchate-decision', 'appeal-explanation'],
  },
  8: {
    body_el:
      'Επίσκοποι, ηγούμενοι και πνευματικοί από Κύπρο, Ελλάδα και Άγιον Όρος εκφράζονται δημοσίως υπέρ του Μητροπολίτη. Σε όλες τις ενορίες της Πάφου ξεκινούν σύλλογοι πιστών, ανοιχτές επιστολές και διαμαρτυρίες. Η υπόθεση γίνεται διεθνής.',
    body_ru:
      'Епископы, игумены и духовники с Кипра, из Греции и со Святой Горы Афон публично высказываются в поддержку митрополита. По всем приходам Пафоса формируются общины верующих, открытые письма, протесты. Дело становится международным.',
    body_en:
      'Bishops, abbots and spiritual fathers from Cyprus, Greece and Mount Athos voice their support for the Metropolitan publicly. Across all parishes of Paphos lay congregations form, open letters circulate, protests are organised. The case becomes international.',
    related_doc_slugs: [],
  },
  9: {
    body_el:
      'Η υπόθεση παραμένει ανοιχτή στη συνείδηση των πιστών. Ο Μητροπολίτης Τυχικός διαμένει επί του παρόντος στο Άγιον Όρος. Δημόσιες πρωτοβουλίες υπέρ της δίκαιης κανονικής επανεξέτασης συνεχίζονται.',
    body_ru:
      'Дело остаётся открытым в сознании верующих. Митрополит Тихикос в настоящее время пребывает на Святой Горе Афон. Общественные инициативы за справедливое каноническое пересмотрение продолжаются.',
    body_en:
      'The case remains open in the conscience of the faithful. Metropolitan Tychikos currently resides on Mount Athos. Public initiatives in favour of a just canonical review continue.',
    related_doc_slugs: [],
  },
};

export function getEnrichment(sortOrder: number): TimelineEnrichment | null {
  return TIMELINE_ENRICHMENT[sortOrder] ?? null;
}
