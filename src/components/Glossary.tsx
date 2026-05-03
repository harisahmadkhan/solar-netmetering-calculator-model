const TERMS = [
  { en: 'Generation',          ur: 'بجلی پیدا',      def: 'Total kWh your panels produce' },
  { en: 'Self-consumed',       ur: 'خود استعمال',    def: 'Solar used directly during the day + battery at night' },
  { en: 'Performance ratio',   ur: 'کارکردگی',       def: 'Panel efficiency accounting for heat, dust, and wiring losses' },
  { en: 'Direct self-consumption %', ur: 'دن کا استعمال', def: 'Fraction of generation used during sun hours' },
  { en: 'Battery usable',      ur: 'بیٹری ذخیرہ',   def: 'Energy stored in battery available for night use' },
  { en: 'Import',              ur: 'گرڈ سے بجلی',   def: 'Units purchased from your DISCO' },
  { en: 'Export',              ur: 'گرڈ کو بجلی',   def: 'Surplus solar pushed back to the grid' },
  { en: 'Export income',       ur: 'PESCO کی ادائیگی', def: 'Rs your DISCO pays you at NAEPP rate (Rs 8.13/unit)' },
  { en: 'Credit fwd',          ur: 'اگلے ماہ کریڈٹ', def: 'Unused export credit rolled to the next month\'s bill' },
  { en: 'Import rate',         ur: 'درآمد ریٹ',      def: 'All-in Rs/unit your DISCO charges you (base + GST + ED + FPA + QTA)' },
  { en: 'NM bill',             ur: 'نیٹ میٹرنگ بل', def: 'Monthly bill with net metering active' },
  { en: 'No-NM bill',          ur: 'بغیر NM بل',    def: 'Bill with solar but without net metering' },
  { en: 'Min bill floor',      ur: 'کم از کم بل',   def: 'Fixed charges always due (~Rs 185 for PESCO)' },
  { en: 'NM save',             ur: 'نیٹ میٹرنگ بچت', def: 'How much less you pay vs no solar at all' },
  { en: 'Non-NM save',         ur: 'خودکفالت بچت',  def: 'Saving from self-consumption alone (no export credit)' },
  { en: 'NM edge',             ur: 'NM کا اضافی فائدہ', def: 'Extra saving NM gives you on top of non-NM' },
  { en: 'NM payback',          ur: 'سرمایہ واپسی',  def: 'Month when the install cost is fully recovered' },
  { en: 'Self-sufficiency %',  ur: 'خودکفالت',      def: '% of your total load covered by solar + battery' },
  { en: 'NM worth it?',        ur: 'فائدہ مند ہے؟', def: 'Whether net saving after install cost is positive' },
  { en: 'NAEPP',               ur: 'NAEPP',          def: 'National Average Energy Purchase Price — buyback rate set by NEPRA (Rs 8.13/unit CY 2026)' },
];

export default function Glossary() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Glossary / اصطلاحات</h2>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {TERMS.map(t => (
          <div key={t.en} className="py-2 grid grid-cols-3 text-sm gap-2">
            <span className="font-medium text-gray-800 dark:text-gray-200">{t.en}</span>
            <span className="text-right text-gray-500 dark:text-gray-400 font-medium" dir="rtl">{t.ur}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{t.def}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
