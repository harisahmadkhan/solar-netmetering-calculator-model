import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { MonthRow } from '../../engine/calculator';
import { chartTheme } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props { rows: MonthRow[]; isDark: boolean }

export default function ExportIncomeChart({ rows, isDark }: Props) {
  const labels = rows.map(r => r.label);
  const data = {
    labels,
    datasets: [
      { label: 'Export income (Rs)', data: rows.map(r => r.expIncome), backgroundColor: '#f59e0b' },
      { label: 'Credit fwd (Rs)',    data: rows.map(r => r.nmCarry),   backgroundColor: '#10b981' },
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
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Export Income & Credit Carry-Forward</h3>
      <div className="flex gap-4 text-xs mb-2 flex-wrap text-gray-600 dark:text-gray-400">
        <span><span className="inline-block w-3 h-3 bg-amber-500 rounded-sm mr-1" />Export income</span>
        <span><span className="inline-block w-3 h-3 bg-emerald-500 rounded-sm mr-1" />Credit fwd</span>
      </div>
      <div className="h-56">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
