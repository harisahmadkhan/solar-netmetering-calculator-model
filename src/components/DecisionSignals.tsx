import type { CalcResult } from '../engine/calculator';
import type { AppState, NightLoad } from '../hooks/useCalculator';

const NIGHT_KWH: Record<NightLoad, number> = {
  light: 4, moderate: 9, heavy: 15, vheavy: 22,
};

interface Props {
  result: CalcResult;
  state: AppState;
}

function Signal({ label, value, color, sub }: {
  label: string; value: string; color: string; sub?: string;
}) {
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</div>
      <div className="text-lg font-bold">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function DecisionSignals({ result, state }: Props) {
  const r = result;
  const nightKwh = NIGHT_KWH[state.nightLoad];
  const batSufficient = state.bat >= nightKwh;

  const nmInstallCost = state.smartMeterCost + state.vendorCost;

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3">Decision Signals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Signal
          label="Battery vs night need"
          value={batSufficient ? 'Sufficient ✓' : 'Undersized ✗'}
          color={batSufficient ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'}
          sub={`${state.bat} kWh vs ${nightKwh} kWh night load`}
        />
        <Signal
          label="NM worth it?"
          value={r.nmNet18 >= 0 ? 'Yes ✓' : 'Not yet ✗'}
          color={r.nmNet18 >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'}
          sub={`Net saving: Rs ${r.nmNet18.toLocaleString()}`}
        />
        <Signal
          label="Export income 18m"
          value={`Rs ${r.tExpIncome.toLocaleString()}`}
          color="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
          sub="At NAEPP Rs 8.13/unit"
        />
        <Signal
          label="NM edge over non-NM"
          value={`Rs ${r.nmEdge18.toLocaleString()}`}
          color="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
          sub="Extra value of carry-forward credit"
        />
        <Signal
          label="Self-sufficiency"
          value={`${r.selfSuf}%`}
          color={
            r.selfSuf >= 70
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : r.selfSuf >= 40
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }
          sub="% of load from solar + battery"
        />
        <Signal
          label="NM payback"
          value={r.nmPaybackMonth ? `Month ${r.nmPaybackMonth}` : '>18 months'}
          color={
            r.nmPaybackMonth && r.nmPaybackMonth <= 14
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
          }
          sub={`Install cost: Rs ${nmInstallCost.toLocaleString()}`}
        />
      </div>
    </div>
  );
}
