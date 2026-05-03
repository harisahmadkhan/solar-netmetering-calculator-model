import type { CalcResult } from '../engine/calculator';
import type { AppState } from '../hooks/useCalculator';

interface Props {
  result: CalcResult;
  state: AppState;
}

function Card({ title, value, sub, color = '' }: {
  title: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="kpi-card">
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{children}</div>
    </div>
  );
}

function pct(n: number) { return `${n}%`; }
function rs(n: number) { return `Rs ${n.toLocaleString()}`; }
function kwh(n: number) { return `${n.toLocaleString()} kWh`; }

export default function KpiDashboard({ result, state }: Props) {
  const r = result;
  const nmInstallCost = state.smartMeterCost + state.vendorCost;

  const selfSufColor = r.selfSuf >= 70 ? 'text-emerald-600' : r.selfSuf >= 40 ? 'text-amber-600' : 'text-red-500';
  const expRatioColor = r.expRatio > 60 ? 'text-red-500' : r.expRatio > 30 ? 'text-amber-600' : 'text-emerald-600';
  const nmNetColor = r.nmNet18 >= 0 ? 'text-emerald-600' : 'text-red-500';
  const paybackLabel = r.nmPaybackMonth ? `Month ${r.nmPaybackMonth}` : '>18 months';
  const paybackColor = r.nmPaybackMonth && r.nmPaybackMonth <= 14 ? 'text-emerald-600' : 'text-amber-600';

  return (
    <div className="space-y-6">
      <Group title="Generation & Solar">
        <Card title="Total generation (18m)" value={kwh(r.tGen)} />
        <Card title="Total exported" value={kwh(r.tExp)} />
        <Card title="Export income (18m)" value={rs(r.tExpIncome)} color="text-amber-600" />
        <Card title="Export ratio" value={pct(r.expRatio)} color={expRatioColor}
          sub={r.expRatio > 60 ? 'Consider more self-consumption' : undefined} />
        <Card title="Self-sufficiency" value={pct(r.selfSuf)} color={selfSufColor} />
        <Card title="Peak credit fwd" value={rs(r.peakCarry)} color="text-emerald-600" />
      </Group>

      <Group title="With Net Metering">
        <Card title="Avg NM bill/month" value={rs(r.avgNmBill)} />
        <Card title="NM avg reduction" value={pct(r.nmPct)} />
        <Card title="NM saving gross (18m)" value={rs(r.tNmSave)} />
        <Card title="NM install cost" value={rs(nmInstallCost)} />
        <Card title="NM net saving (18m)" value={rs(r.nmNet18)} color={nmNetColor} />
        <Card title="NM payback" value={paybackLabel} color={paybackColor} />
      </Group>

      <Group title="Without Net Metering">
        <Card title="Avg non-NM bill/month" value={rs(r.avgNonBill)} />
        <Card title="Non-NM avg reduction" value={pct(r.nonPct)} />
        <Card title="Non-NM saving (18m)" value={rs(r.tNonSave)} />
        <Card title="NM edge over non-NM" value={rs(r.nmEdge18)} color="text-amber-600" />
        <Card title="NM worth it?" value={r.nmNet18 >= 0 ? 'Yes ✓' : 'Not yet ✗'}
          color={r.nmNet18 >= 0 ? 'text-emerald-600' : 'text-red-500'} />
        <Card title="NEPRA concurrence fee" value={r.neprFee === 0 ? 'Rs 0 (waived)' : rs(r.neprFee)}
          color={r.neprFee === 0 ? 'text-emerald-600' : 'text-gray-700'}
          sub={r.neprFee === 0 ? '≤25 kW, abolished 28 Apr 2026' : undefined} />
      </Group>
    </div>
  );
}
