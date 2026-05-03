import {
  Chart as ChartJS, CategoryScale, LinearScale,
  LineElement, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MonthRow } from '../../engine/calculator';
import { chartTheme } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

interface Props { rows: MonthRow[]; nmInstallCost: number; isDark: boolean }

export default function CumulativeSavingsChart({ rows, nmInstallCost, isDark }: Props) {
  const labels = rows.map(r => r.label);

  let cumNm = -nmInstallCost;
  let cumNon = 0;
  const nmData: number[] = [];
  const nonData: number[] = [];
  rows.forEach(r => {
    cumNm += r.nmSave;
    cumNon += r.nonSave;
    nmData.push(cumNm);
    nonData.push(cumNon);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'NM cumulative',
        data: nmData,
        borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
        borderWidth: 2, tension: 0.3, fill: true,
      },
      {
        label: 'Non-NM cumulative',
        data: nonData,
        borderColor: '#ef4444', borderDash: [5, 4],
        borderWidth: 2, tension: 0.3, fill: false,
      },
    ],
  };
  const theme = chartTheme(isDark);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: theme.plugins,
    scales: {
      x: theme.scales.x,
      y: { ...theme.scales.y, title: { display: true, text: 'Rs cumulative', color: theme.scales.y.title.color } },
    },
  };
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Cumulative Savings</h3>
      <div className="flex gap-4 text-xs mb-2 flex-wrap text-gray-600 dark:text-gray-400">
        <span><span className="inline-block w-5 border-t-2 border-emerald-500 mr-1 align-middle" />NM (after install cost)</span>
        <span><span className="inline-block w-5 border-t-2 border-red-500 border-dashed mr-1 align-middle" />Non-NM</span>
      </div>
      <div className="h-56">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
