import { DISCO_CONFIG, DISCO_KEYS } from '../data/discos';

interface Props {
  selected: string;
  onChange: (disco: string) => void;
}

export default function DiscoSelector({ selected, onChange }: Props) {
  const cfg = DISCO_CONFIG[selected];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">Select Your DISCO</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {DISCO_KEYS.map(key => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              key === selected
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <div className="font-medium text-gray-800 dark:text-gray-100">{cfg.name}</div>
        <div>{cfg.province} — {cfg.coverage}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cfg.notes}</div>
        {cfg.fogWarning && (
          <div className="mt-2 px-3 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-300">
            ⚠ Fog/smog season may reduce generation Nov–Feb. Adjust PSH values in Assumptions.
          </div>
        )}
        {cfg.keSpecial && (
          <div className="mt-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-300">
            ℹ K-Electric uses its own multi-year tariff (2023–2030), not NEPRA uniform tariff. NM applications go through KE directly.
          </div>
        )}
      </div>
    </div>
  );
}
