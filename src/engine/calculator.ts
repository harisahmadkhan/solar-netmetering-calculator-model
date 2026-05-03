import { MONTHS, A_TO_MO } from '../data/months';

export interface CalcParams {
  sysKw: number;
  invKw: number;
  bat: number;        // usable kWh
  prFrac: number;     // 0–1 performance ratio
  dscFrac: number;    // 0–1 direct self-consumption fraction
  cons: number;       // monthly kWh consumption
  impRate: number;    // Rs/unit import
  expRate: number;    // Rs/unit export (NAEPP)
  minBill: number;    // Rs minimum bill floor
  nightKw: number;    // night load kWh/night
  batEff: number;     // battery round-trip efficiency 0–1
  dod: number;        // depth of discharge 0–1
  nmInstallCost: number; // total NM install cost Rs
  psh: Record<number, number>; // month-of-year 0–11 → PSH
  assumptionValues?: number[]; // optional override: 12 PSH values Jun→May
}

export interface MonthRow {
  label: string;
  mo: number;
  s: string;
  gen: number;
  self: number;
  imported: number;
  exported: number;
  expIncome: number;
  // NM columns
  nmBill: number;
  nmCarry: number;
  nmSave: number;
  // non-NM columns
  nonBill: number;
  nonSave: number;
  nmEdge: number;
  noSolarBill: number;
}

export interface CalcResult {
  rows: MonthRow[];
  // aggregates
  tGen: number;
  tSelf: number;
  tImp: number;
  tExp: number;
  tExpIncome: number;
  tNmSave: number;
  tNonSave: number;
  nmNet18: number;
  nmEdge18: number;
  selfSuf: number;     // %
  expRatio: number;    // %
  avgNmBill: number;
  avgNonBill: number;
  nmPct: number;       // avg reduction % NM
  nonPct: number;      // avg reduction % non-NM
  peakCarry: number;   // max carry-forward Rs
  nmPaybackMonth: number | null; // 1-based month index or null
  neprFee: number;
}

export function buildPsh(params: CalcParams): Record<number, number> {
  if (params.assumptionValues && params.assumptionValues.length === 12) {
    const psh: Record<number, number> = {};
    for (let i = 0; i < 12; i++) psh[A_TO_MO[i]] = params.assumptionValues[i];
    return psh;
  }
  return params.psh;
}

export function runCalc(params: CalcParams): CalcResult {
  const psh = buildPsh(params);
  const {
    sysKw, invKw, bat, prFrac, dscFrac,
    cons, impRate, expRate, minBill,
    nightKw, batEff, dod, nmInstallCost,
  } = params;

  const effSys = Math.min(sysKw, invKw * 1.15);
  const noSolarBill = Math.max(minBill, Math.round(cons * impRate));

  // Physics pass
  interface PhysRow {
    label: string; mo: number; s: string;
    gen: number; self: number; imported: number; exported: number; expIncome: number;
  }

  const physRows: PhysRow[] = MONTHS.map(m => {
    const gen = Math.round(effSys * (psh[m.mo] ?? 5) * prFrac * m.d);
    const direct = Math.min(Math.round(gen * dscFrac), cons);
    const batCharge = Math.min(bat * dod, gen * 0.4);
    const batNight = Math.min(batCharge * batEff * m.d, nightKw * m.d);
    const totalSelf = Math.min(direct + batNight, cons);
    const imported = Math.max(0, cons - Math.round(totalSelf));
    const exported = Math.max(0, gen - Math.round(totalSelf));
    const expIncome = Math.round(exported * expRate);
    return { label: m.label, mo: m.mo, s: m.s, gen, self: Math.round(totalSelf), imported, exported, expIncome };
  });

  // NM billing with carry-forward
  let carry = 0;
  const nmRows = physRows.map(r => {
    const avail = carry + r.expIncome;
    const raw = r.imported * impRate - avail;
    let bill: number;
    let newCarry: number;
    if (raw > minBill) {
      bill = Math.round(raw);
      newCarry = 0;
    } else if (raw > 0) {
      bill = minBill;
      newCarry = 0;
    } else {
      bill = minBill;
      newCarry = Math.round(Math.abs(raw));
    }
    carry = newCarry;
    const nmSave = noSolarBill - bill;
    return { ...r, nmBill: bill, nmCarry: newCarry, nmSave };
  });

  // Non-NM billing
  const rows: MonthRow[] = nmRows.map(r => {
    const nonBill = Math.max(minBill, Math.round(r.imported * impRate));
    const nonSave = noSolarBill - nonBill;
    const nmEdge = nonBill - r.nmBill;
    return { ...r, nonBill, nonSave, nmEdge, noSolarBill };
  });

  // Aggregates
  const tGen = rows.reduce((s, r) => s + r.gen, 0);
  const tSelf = rows.reduce((s, r) => s + r.self, 0);
  const tImp = rows.reduce((s, r) => s + r.imported, 0);
  const tExp = rows.reduce((s, r) => s + r.exported, 0);
  const tExpIncome = rows.reduce((s, r) => s + r.expIncome, 0);
  const tNmSave = rows.reduce((s, r) => s + r.nmSave, 0);
  const tNonSave = rows.reduce((s, r) => s + r.nonSave, 0);

  const nmNet18 = tNmSave - nmInstallCost;
  const nmEdge18 = tNmSave - tNonSave;
  const selfSuf = tSelf + tImp > 0 ? Math.round(tSelf / (tSelf + tImp) * 100) : 0;
  const expRatio = tGen > 0 ? Math.round(tExp / tGen * 100) : 0;

  const avgNmBill = Math.round(rows.reduce((s, r) => s + r.nmBill, 0) / rows.length);
  const avgNonBill = Math.round(rows.reduce((s, r) => s + r.nonBill, 0) / rows.length);
  const nmPct = noSolarBill > 0 ? Math.round((1 - avgNmBill / noSolarBill) * 100) : 0;
  const nonPct = noSolarBill > 0 ? Math.round((1 - avgNonBill / noSolarBill) * 100) : 0;
  const peakCarry = Math.max(...rows.map(r => r.nmCarry));

  // Payback: first month where cumulative NM net saving >= 0
  let cumSave = -nmInstallCost;
  let nmPaybackMonth: number | null = null;
  for (let i = 0; i < rows.length; i++) {
    cumSave += rows[i].nmSave;
    if (cumSave >= 0 && nmPaybackMonth === null) nmPaybackMonth = i + 1;
  }

  const neprFee = sysKw <= 25 ? 0 : Math.round(sysKw * 1000);

  return {
    rows, tGen, tSelf, tImp, tExp, tExpIncome,
    tNmSave, tNonSave, nmNet18, nmEdge18,
    selfSuf, expRatio, avgNmBill, avgNonBill,
    nmPct, nonPct, peakCarry, nmPaybackMonth, neprFee,
  };
}
