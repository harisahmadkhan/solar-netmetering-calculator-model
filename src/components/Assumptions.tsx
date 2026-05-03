import type { AppState } from '../hooks/useCalculator';

const MONTH_LABELS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

const INPUT_CLS = 'w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm text-center bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400';

interface Props {
  state: AppState;
  setPsh: (idx: number, val: number) => void;
  set: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
}

export default function Assumptions({ state, setPsh, set }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">Assumptions — Peak Sun Hours (editable)</h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Adjust individual month PSH values for your location. Jun→May order (a0–a11).
        Winter months are most sensitive for {state.disco} — lower values = higher winter import.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
        {MONTH_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</label>
            <input
              type="number"
              min={0.5} max={10} step={0.1}
              value={state.pshValues[i]}
              onChange={e => setPsh(i, Number(e.target.value))}
              className={INPUT_CLS}
            />
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">Advanced Parameters</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Battery efficiency (%)</label>
          <input
            type="number" min={70} max={100} step={1}
            value={state.batEff}
            onChange={e => set('batEff', Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Depth of discharge (%)</label>
          <input
            type="number" min={50} max={100} step={1}
            value={state.dod}
            onChange={e => set('dod', Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
