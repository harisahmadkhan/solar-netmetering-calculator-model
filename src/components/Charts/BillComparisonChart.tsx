import {
  Chart as ChartJS, CategoryScale, LinearScale,
  LineElement, PointElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MonthRow } from '../../engine/calculator';
import { chartTheme } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

interface Props { rows: MonthRow[]; isDark: boolean }

export default function BillComparisonChart({ rows, isDark }: Props) {
  const labels = rows.map(r => r.label);
  const data = {
    labels,
    datasets: [
      {
        label: 'NM bill',
        data: rows.map(r => r.nmBill),
        borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
        borderWidth: 2, tension: 0.3, fill: false,
      },
      {
        label: 'Non-NM bill',
        data: rows.map(r => r.nonBill),
        borderColor: '#ef4444', borderDash: [5, 4],
        borderWidth: 2, tension: 0.3, fill: false,
      },
      {
        label: 'No-solar bill',
        data: rows.map(r => r.noSolarBill),
        borderColor: '#93c5fd', borderDash: [3, 6],
        borderWidth: 1.5, tension: 0, fill: false,
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
      y: { ...theme.scales.y, title: { display: true, text: 'Rs', color: theme.scales.y.title.color } },
    },
  };
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Bill Comparison</h3>
      <div className="flex gap-4 text-xs mb-2 flex-wrap text-gray-600 dark:text-gray-400">
        <span><span className="inline-block w-5 border-t-2 border-emerald-500 mr-1 align-middle" />NM bill</span>
        <span><span className="inline-block w-5 border-t-2 border-red-500 border-dashed mr-1 align-middle" />Non-NM</span>
        <span><span className="inline-block w-5 border-t-2 border-blue-300 border-dotted mr-1 align-middle" />No-solar</span>
      </div>
      <div className="h-56">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
