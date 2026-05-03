import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { MonthRow } from '../../engine/calculator';
import { chartTheme } from './chartTheme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props { rows: MonthRow[]; isDark: boolean }

export default function GenerationChart({ rows, isDark }: Props) {
  const labels = rows.map(r => r.label);
  const data = {
    labels,
    datasets: [
      { label: 'Self-consumed', data: rows.map(r => r.self), backgroundColor: '#10b981', stack: 'gen' },
      { label: 'Exported',      data: rows.map(r => r.exported), backgroundColor: '#f59e0b', stack: 'gen' },
      { label: 'Imported',      data: rows.map(r => r.imported), backgroundColor: '#ef4444', stack: 'load' },
    ],
  };
  const theme = chartTheme(isDark);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: theme.plugins,
    scales: {
      x: theme.scales.x,
      y: { ...theme.scales.y, title: { display: true, text: 'kWh', color: theme.scales.y.title.color } },
    },
  };
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Generation Flow</h3>
      <div className="flex gap-4 text-xs mb-2 flex-wrap text-gray-600 dark:text-gray-400">
        <span><span className="inline-block w-3 h-3 bg-emerald-500 rounded-sm mr-1" />Self-consumed</span>
        <span><span className="inline-block w-3 h-3 bg-amber-500 rounded-sm mr-1" />Exported</span>
        <span><span className="inline-block w-3 h-3 bg-red-500 rounded-sm mr-1" />Imported</span>
      </div>
      <div className="h-56">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
