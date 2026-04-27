// Plural rules for ru/el/en using Intl.PluralRules.
// Each forms map must cover plural categories the locale actually uses.

type Forms = {
  one?: string;
  few?: string;
  many?: string;
  other: string;
};

export function plural(locale: string, count: number, forms: Forms): string {
  const rules = new Intl.PluralRules(locale);
  const category = rules.select(count) as keyof Forms;
  return forms[category] ?? forms.other;
}
