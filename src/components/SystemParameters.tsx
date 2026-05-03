import type { AppState, NightLoad } from '../hooks/useCalculator';

interface Props {
  state: AppState;
  set: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
}

function SliderRow({
  label, value, min, max, step = 1, unit,
  onChange, format,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; unit: string;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="slider-row">
      <label>
        <span className="dark:text-gray-300">{label}</span>
        <span className="font-semibold text-gray-800 dark:text-gray-100">{format ? format(value) : value} {unit}</span>
      </label>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}

const NIGHT_OPTS: { value: NightLoad; label: string }[] = [
  { value: 'light',    label: 'Light (~4 kWh/night)' },
  { value: 'moderate', label: 'Moderate (~9 kWh/night)' },
  { value: 'heavy',    label: 'Heavy (~15 kWh/night)' },
  { value: 'vheavy',   label: 'Very heavy (~22 kWh/night)' },
];

export default function SystemParameters({ state, set }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">System Parameters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SliderRow label="Solar array" value={state.sysKw} min={1} max={30} unit="kW"
          onChange={v => set('sysKw', v)} />
        <SliderRow label="Inverter capacity" value={state.invKw} min={1} max={25} unit="kW"
          onChange={v => set('invKw', v)} />
        <SliderRow label="Battery (usable)" value={state.bat} min={0} max={50} unit="kWh"
          onChange={v => set('bat', v)} />
        <SliderRow label="Performance ratio" value={state.pr} min={60} max={90} unit="%"
          onChange={v => set('pr', v)} />
        <SliderRow label="Direct self-consumption" value={state.dsc} min={5} max={60} unit="%"
          onChange={v => set('dsc', v)} />
        <SliderRow label="Monthly consumption" value={state.cons} min={50} max={2000} step={10} unit="kWh"
          onChange={v => set('cons', v)} />
        <SliderRow label="Import rate (all-in)" value={state.impRate} min={20} max={80} unit="Rs/unit"
          onChange={v => set('impRate', v)} />
        <SliderRow label="NAEPP buyback rate" value={state.expRate} min={5} max={30} step={0.01} unit="Rs/unit"
          format={v => v.toFixed(2)}
          onChange={v => set('expRate', v)} />
        <SliderRow label="Min bill floor" value={state.minBill} min={100} max={1000} unit="Rs"
          onChange={v => set('minBill', v)} />
        <SliderRow label="Smart meter cost" value={state.smartMeterCost} min={0} max={80000} step={1000} unit="Rs"
          format={v => v.toLocaleString()}
          onChange={v => set('smartMeterCost', v)} />
        <SliderRow label="Vendor / install fee" value={state.vendorCost} min={0} max={200000} step={5000} unit="Rs"
          format={v => v.toLocaleString()}
          onChange={v => set('vendorCost', v)} />
        <div className="slider-row">
          <label><span className="dark:text-gray-300">Night load profile</span></label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={state.nightLoad}
            onChange={e => set('nightLoad', e.target.value as NightLoad)}
          >
            {NIGHT_OPTS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
