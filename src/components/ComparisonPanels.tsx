import type { CalcResult } from '../engine/calculator';
import type { AppState } from '../hooks/useCalculator';

interface Props { result: CalcResult; state: AppState }

function Row({ label, value, color = '' }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-600/50 last:border-0 text-sm">
      <span className="text-gray-600 dark:text-gray-300">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

export default function ComparisonPanels({ result, state }: Props) {
  const r = result;
  const nmInstallCost = state.smartMeterCost + state.vendorCost;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5">
        <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3">With Net Metering</h3>
        <Row label="Avg monthly bill" value={`Rs ${r.avgNmBill.toLocaleString()}`} />
        <Row label="Bill reduction" value={`${r.nmPct}%`} color="text-emerald-700 dark:text-emerald-400" />
        <Row label="18m gross saving" value={`Rs ${r.tNmSave.toLocaleString()}`} />
        <Row label="Install cost" value={`Rs ${nmInstallCost.toLocaleString()}`} color="text-red-600 dark:text-red-400" />
        <Row
          label="18m net saving"
          value={`Rs ${r.nmNet18.toLocaleString()}`}
          color={r.nmNet18 >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}
        />
        <Row label="Payback month" value={r.nmPaybackMonth ? `Month ${r.nmPaybackMonth}` : '>18m'}
          color={r.nmPaybackMonth && r.nmPaybackMonth <= 14 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'} />
        <Row label="Peak credit carry-fwd" value={`Rs ${r.peakCarry.toLocaleString()}`} color="text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-5">
        <h3 className="font-bold text-red-800 dark:text-red-300 mb-3">Without Net Metering</h3>
        <Row label="Avg monthly bill" value={`Rs ${r.avgNonBill.toLocaleString()}`} />
        <Row label="Bill reduction" value={`${r.nonPct}%`} color="text-red-700 dark:text-red-400" />
        <Row label="18m gross saving" value={`Rs ${r.tNonSave.toLocaleString()}`} />
        <Row label="No install cost" value="Rs 0" color="text-emerald-600 dark:text-emerald-400" />
        <Row label="18m net saving" value={`Rs ${r.tNonSave.toLocaleString()}`} color="text-gray-700 dark:text-gray-300" />
        <Row label="No carry-forward" value="No credit system" color="text-gray-400 dark:text-gray-500" />
        <Row label="NM edge you're missing" value={`Rs ${r.nmEdge18.toLocaleString()}`} color="text-amber-700 dark:text-amber-400" />
      </div>
    </div>
  );
}
