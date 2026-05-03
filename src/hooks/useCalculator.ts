import { useState, useMemo } from 'react';
import { DISCO_CONFIG } from '../data/discos';
import { runCalc } from '../engine/calculator';
import type { CalcParams, CalcResult } from '../engine/calculator';

export type NightLoad = 'light' | 'moderate' | 'heavy' | 'vheavy';

const NIGHT_KWH: Record<NightLoad, number> = {
  light: 4,
  moderate: 9,
  heavy: 15,
  vheavy: 22,
};

export interface AppState {
  disco: string;
  sysKw: number;
  invKw: number;
  bat: number;
  pr: number;
  dsc: number;
  cons: number;
  impRate: number;
  expRate: number;
  minBill: number;
  smartMeterCost: number;
  vendorCost: number;
  nightLoad: NightLoad;
  batEff: number;
  dod: number;
  // 12 editable PSH values (Jun→May, a0–a11)
  pshValues: number[];
}

function defaultState(disco: string): AppState {
  const cfg = DISCO_CONFIG[disco];
  // Convert psh map to a0–a11 array (Jun→May)
  const A_TO_MO = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];
  const pshValues = A_TO_MO.map(mo => cfg.psh[mo] ?? 5);
  return {
    disco,
    sysKw: 12,
    invKw: 11,
    bat: 12,
    pr: 80,
    dsc: 13,
    cons: 250,
    impRate: cfg.importRate,
    expRate: 8.13,
    minBill: cfg.minBill,
    smartMeterCost: cfg.nmMeterCost,
    vendorCost: 100000,
    nightLoad: 'moderate',
    batEff: 88,
    dod: 90,
    pshValues,
  };
}

export function useCalculator() {
  const [state, setState] = useState<AppState>(() => defaultState('PESCO'));

  function set<K extends keyof AppState>(key: K, value: AppState[K]) {
    setState(prev => ({ ...prev, [key]: value }));
  }

  function selectDisco(disco: string) {
    setState(prev => {
      const cfg = DISCO_CONFIG[disco];
      const A_TO_MO = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];
      const pshValues = A_TO_MO.map(mo => cfg.psh[mo] ?? 5);
      return {
        ...prev,
        disco,
        impRate: cfg.importRate,
        minBill: cfg.minBill,
        smartMeterCost: cfg.nmMeterCost,
        pshValues,
      };
    });
  }

  function setPsh(idx: number, val: number) {
    setState(prev => {
      const pshValues = [...prev.pshValues];
      pshValues[idx] = val;
      return { ...prev, pshValues };
    });
  }

  const result: CalcResult = useMemo(() => {
    const nmInstallCost = state.smartMeterCost + state.vendorCost;
    const params: CalcParams = {
      sysKw: state.sysKw,
      invKw: state.invKw,
      bat: state.bat,
      prFrac: state.pr / 100,
      dscFrac: state.dsc / 100,
      cons: state.cons,
      impRate: state.impRate,
      expRate: state.expRate,
      minBill: state.minBill,
      nightKw: NIGHT_KWH[state.nightLoad],
      batEff: state.batEff / 100,
      dod: state.dod / 100,
      nmInstallCost,
      psh: DISCO_CONFIG[state.disco].psh,
      assumptionValues: state.pshValues,
    };
    return runCalc(params);
  }, [state]);

  return { state, set, selectDisco, setPsh, result };
}
