import type { MonthRow } from '../engine/calculator';

const SEASON_ICON: Record<string, string> = {
  sun: '☀',
  aut: '◎',
  win: '❄',
  spr: '♻',
};

const SEASON_ROW: Record<string, string> = {
  sun: 'season-sun',
  aut: 'season-aut',
  win: 'season-win',
  spr: 'season-spr',
};

function rs(n: number) { return n.toLocaleString(); }

interface Props {
  rows: MonthRow[];
}

export default function ForecastTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="w-full text-xs min-w-[900px]">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          <tr>
            <th className="px-3 py-2 text-left">Month</th>
            <th className="px-3 py-2 text-right">Gen</th>
            <th className="px-3 py-2 text-right">Self</th>
            <th className="px-3 py-2 text-right">Import</th>
            <th className="px-3 py-2 text-right">Export</th>
            <th className="px-3 py-2 text-right">Exp income</th>
            <th className="px-3 py-2 text-right">Credit fwd</th>
            <th className="px-3 py-2 text-right">NM bill</th>
            <th className="px-3 py-2 text-right">No-NM bill</th>
            <th className="px-3 py-2 text-right">NM save</th>
            <th className="px-3 py-2 text-right">Non-NM save</th>
            <th className="px-3 py-2 text-right">NM edge</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {rows.map((r, i) => (
            <tr key={i} className={`${SEASON_ROW[r.s]} hover:brightness-95 dark:hover:brightness-110 transition-all`}>
              <td className="px-3 py-2 font-medium whitespace-nowrap">
                {SEASON_ICON[r.s]} {r.label}
              </td>
              <td className="px-3 py-2 text-right">{rs(r.gen)}</td>
              <td className="px-3 py-2 text-right text-emerald-700 dark:text-emerald-400 font-medium">{rs(r.self)}</td>
              <td className="px-3 py-2 text-right text-red-600 dark:text-red-400">{rs(r.imported)}</td>
              <td className="px-3 py-2 text-right text-amber-700 dark:text-amber-400">{rs(r.exported)}</td>
              <td className="px-3 py-2 text-right text-amber-700 dark:text-amber-400">Rs {rs(r.expIncome)}</td>
              <td className="px-3 py-2 text-right text-emerald-600 dark:text-emerald-400">
                {r.nmCarry > 0 ? `Rs ${rs(r.nmCarry)}` : '—'}
              </td>
              <td className="px-3 py-2 text-right font-semibold text-emerald-700 dark:text-emerald-400">Rs {rs(r.nmBill)}</td>
              <td className="px-3 py-2 text-right text-red-600 dark:text-red-400">Rs {rs(r.nonBill)}</td>
              <td className="px-3 py-2 text-right">
                <span className={r.nmSave >= 0 ? 'text-emerald-700 dark:text-emerald-400 font-medium' : 'text-red-500'}>
                  Rs {rs(r.nmSave)}
                </span>
              </td>
              <td className="px-3 py-2 text-right">
                <span className={r.nonSave >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>
                  Rs {rs(r.nonSave)}
                </span>
              </td>
              <td className="px-3 py-2 text-right">
                <span className={r.nmEdge >= 0 ? 'text-amber-700 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}>
                  Rs {rs(r.nmEdge)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
