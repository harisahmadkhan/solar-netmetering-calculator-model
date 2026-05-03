import DiscoSelector from './components/DiscoSelector';
import SystemParameters from './components/SystemParameters';
import KpiDashboard from './components/KpiDashboard';
import ForecastTable from './components/ForecastTable';
import GenerationChart from './components/Charts/GenerationChart';
import ExportIncomeChart from './components/Charts/ExportIncomeChart';
import BillComparisonChart from './components/Charts/BillComparisonChart';
import CumulativeSavingsChart from './components/Charts/CumulativeSavingsChart';
import ComparisonPanels from './components/ComparisonPanels';
import DecisionSignals from './components/DecisionSignals';
import Glossary from './components/Glossary';
import Assumptions from './components/Assumptions';
import ThemeToggle from './components/ThemeToggle';
import { useCalculator } from './hooks/useCalculator';
import { useTheme } from './hooks/useTheme';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const { state, set, selectDisco, setPsh, result } = useCalculator();
  const { isDark, toggle } = useTheme();
  const nmInstallCost = state.smartMeterCost + state.vendorCost;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-emerald-700 dark:bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold">Pakistan Solar Net Metering Calculator</h1>
              <p className="text-emerald-200 text-sm mt-0.5">
                NEPRA Prosumer Regulations 2026 — 18-month feasibility forecast
              </p>
              <p className="text-emerald-300/70 text-xs mt-1 tracking-widest uppercase">
                ◈ Built by Haris Ahmad Khan
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <ThemeToggle isDark={isDark} toggle={toggle} />
              <div className="text-xs text-emerald-200 space-y-0.5 sm:text-right">
                <div>NAEPP buyback: Rs 8.13/unit (CY 2026, SRO 251(I)/2026)</div>
                <div>NEPRA fee: Rs 0 for systems ≤25 kW (abolished 28 Apr 2026)</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Regulatory banners */}
      <div className="bg-blue-50 dark:bg-blue-950/50 border-b border-blue-200 dark:border-blue-900">
        <div className="max-w-6xl mx-auto px-4 py-2 text-xs text-blue-800 dark:text-blue-300 flex flex-wrap gap-4">
          <span>📋 New regime from 9 Feb 2026: exports billed separately at NAEPP rate, not 1-for-1 offset.</span>
          <span>💡 Self-consumption value (~Rs 50/unit) is ~6× export value (Rs 8.13/unit) — maximise self-use.</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 dark:text-gray-100">

        {/* DISCO + Parameters row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Section title="1. Your DISCO">
            <DiscoSelector selected={state.disco} onChange={selectDisco} />
          </Section>
          <Section title="2. System Parameters">
            <SystemParameters state={state} set={set} />
          </Section>
        </div>

        {/* KPI Dashboard */}
        <Section title="3. KPI Summary">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <KpiDashboard result={result} state={state} />
          </div>
        </Section>

        {/* Decision signals */}
        <Section title="4. Decision Signals">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <DecisionSignals result={result} state={state} />
          </div>
        </Section>

        {/* NM vs non-NM comparison */}
        <Section title="5. NM vs Non-NM Comparison">
          <ComparisonPanels result={result} state={state} />
        </Section>

        {/* Charts */}
        <Section title="6. Charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <GenerationChart rows={result.rows} isDark={isDark} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <ExportIncomeChart rows={result.rows} isDark={isDark} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <BillComparisonChart rows={result.rows} isDark={isDark} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
              <CumulativeSavingsChart rows={result.rows} nmInstallCost={nmInstallCost} isDark={isDark} />
            </div>
          </div>
        </Section>

        {/* 18-month table */}
        <Section title="7. 18-Month Forecast Table">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-1">
            <ForecastTable rows={result.rows} />
          </div>
        </Section>

        {/* Caveats */}
        <Section title="8. Model Limitations">
          <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
            {[
              'Monthly average sun hours only — actual daily variation not modelled',
              'Flat monthly consumption assumed — adjust the slider for AC season manually',
              'Panel degradation not modelled (~0.5%/year)',
              'Battery degradation not modelled (~2–3%/year for LiFePO₄)',
              'PESCO billing errors are common — always verify export credits on your bill',
              'NAEPP rate may change mid-contract — NEPRA has reserved this right',
              '80% transformer cap: dense solar areas (DHA Peshawar, Defence Lahore) may be blocked',
              'DHA/CDA/housing authority NOC may be required before DISCO application',
            ].map((c, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Application process */}
        <Section title="9. NM Application Process">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {[
              'Ensure your sanctioned load ≥ system size',
              'Hire an AEDB-certified installer to prepare the application file',
              'Submit directly to DISCO (no separate NEPRA step for ≤25 kW)',
              'DISCO inspects your system and issues a Renewable Generation Agreement',
              `Pay for bidirectional smart meter (~Rs ${state.smartMeterCost.toLocaleString()})`,
              'DISCO installs the bidirectional meter within 30 days',
            ].map((s, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Assumptions */}
        <Section title="10. Assumptions (editable)">
          <Assumptions state={state} setPsh={setPsh} set={set} />
        </Section>

        {/* Glossary */}
        <Section title="11. Glossary / اصطلاحات">
          <Glossary />
        </Section>

        <footer className="text-xs text-gray-400 dark:text-gray-500 text-center pb-8 space-y-2">
          <div>Data sources: NEPRA SRO 251(I)/2026, NEPRA.org.pk tariff determinations.</div>
          <div>This tool is for indicative purposes only. Verify all figures with your DISCO before making financial decisions.</div>
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-300 dark:text-gray-600 font-light tracking-widest text-xs uppercase">
              ◈ &nbsp; Designed & built by &nbsp;
            </span>
            <span className="text-emerald-600 dark:text-emerald-500 font-semibold tracking-wide">
              Haris Ahmad Khan
            </span>
            <span className="text-gray-300 dark:text-gray-600 font-light tracking-widest text-xs uppercase">
              &nbsp; · &nbsp; Open source · MIT Licence &nbsp; ◈
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
