export interface DiscoConfig {
  name: string;
  province: string;
  coverage: string;
  importRate: number;
  minBill: number;
  psh: Record<number, number>; // month-of-year 0–11 → peak sun hours
  nmMeterCost: number;
  notes: string;
  fogWarning: boolean;
  keSpecial?: boolean; // K-Electric has its own tariff
}

export const DISCO_CONFIG: Record<string, DiscoConfig> = {
  PESCO: {
    name: 'Peshawar Electric Supply Company',
    province: 'KPK',
    coverage: 'All civil districts of Khyber Pakhtunkhwa',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 4.0, 1: 4.5, 2: 5.5, 3: 6.5, 4: 7.0,
      5: 7.2, 6: 7.5, 7: 6.8, 8: 5.8, 9: 4.6, 10: 3.9, 11: 3.7,
    },
    nmMeterCost: 42000,
    notes: 'Fog season Nov–Feb reduces generation. DHA areas risk 80% transformer cap.',
    fogWarning: true,
  },
  TESCO: {
    name: 'Tribal Electric Supply Company',
    province: 'Merged Districts (ex-FATA)',
    coverage: 'Khyber, North/South Waziristan, Kurram, Orakzai, Mohmand',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 4.0, 1: 4.8, 2: 5.8, 3: 6.8, 4: 7.2,
      5: 7.5, 6: 7.5, 7: 6.8, 8: 5.8, 9: 4.8, 10: 3.8, 11: 3.6,
    },
    nmMeterCost: 42000,
    notes: 'Newly merged districts — NM application process may differ. Verify with TESCO directly.',
    fogWarning: true,
  },
  LESCO: {
    name: 'Lahore Electric Supply Company',
    province: 'Punjab',
    coverage: 'Lahore, Kasur, Sheikhupura, Okara',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 3.8, 1: 4.5, 2: 5.5, 3: 6.8, 4: 7.0,
      5: 7.2, 6: 7.0, 7: 6.5, 8: 5.5, 9: 4.5, 10: 3.5, 11: 3.2,
    },
    nmMeterCost: 42000,
    notes: 'Largest DISCO in Pakistan — 5.7M customers. Smog season Dec–Jan affects generation.',
    fogWarning: true,
  },
  IESCO: {
    name: 'Islamabad Electric Supply Company',
    province: 'Islamabad + KP/AJK/GB',
    coverage: 'Islamabad, Rawalpindi, Attock',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 3.8, 1: 4.5, 2: 5.5, 3: 6.8, 4: 7.0,
      5: 7.2, 6: 7.3, 7: 6.6, 8: 5.6, 9: 4.5, 10: 3.6, 11: 3.3,
    },
    nmMeterCost: 42000,
    notes: 'Privatisation planned (short-term). Apply now to lock in current terms.',
    fogWarning: false,
  },
  FESCO: {
    name: 'Faisalabad Electric Supply Company',
    province: 'Punjab',
    coverage: 'Faisalabad, Jhang, Chiniot, Toba Tek Singh',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 4.0, 1: 4.8, 2: 5.6, 3: 7.0, 4: 7.3,
      5: 7.5, 6: 7.2, 7: 6.8, 8: 5.8, 9: 5.0, 10: 4.0, 11: 3.6,
    },
    nmMeterCost: 42000,
    notes: 'Privatisation planned (near-term). Strong summer solar.',
    fogWarning: false,
  },
  GEPCO: {
    name: 'Gujranwala Electric Power Company',
    province: 'Punjab',
    coverage: 'Gujranwala, Sialkot, Gujrat, Hafizabad',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 3.8, 1: 4.5, 2: 5.5, 3: 6.8, 4: 7.0,
      5: 7.2, 6: 7.0, 7: 6.5, 8: 5.5, 9: 4.5, 10: 3.5, 11: 3.2,
    },
    nmMeterCost: 42000,
    notes: 'Privatisation planned (near-term).',
    fogWarning: false,
  },
  MEPCO: {
    name: 'Multan Electric Power Company',
    province: 'Punjab (South)',
    coverage: 'Multan, Bahawalpur, DG Khan, Sahiwal (13 districts)',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 4.5, 1: 5.2, 2: 6.0, 3: 7.2, 4: 7.5,
      5: 7.5, 6: 7.2, 7: 6.8, 8: 6.0, 9: 5.2, 10: 4.5, 11: 4.0,
    },
    nmMeterCost: 42000,
    notes: 'Strong year-round sun. Excellent solar economics.',
    fogWarning: false,
  },
  SEPCO: {
    name: 'Sukkur Electric Power Company',
    province: 'Sindh (North)',
    coverage: 'Sukkur, Larkana, Jacobabad',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 5.2, 1: 6.0, 2: 6.8, 3: 7.5, 4: 7.8,
      5: 7.5, 6: 7.0, 7: 6.8, 8: 6.5, 9: 6.0, 10: 5.5, 11: 5.0,
    },
    nmMeterCost: 42000,
    notes: 'Very strong solar. Minimal seasonal dip.',
    fogWarning: false,
  },
  HESCO: {
    name: 'Hyderabad Electric Supply Company',
    province: 'Sindh (South)',
    coverage: 'Hyderabad, Mirpurkhas, Thatta, Jamshoro',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 5.0, 1: 5.8, 2: 6.5, 3: 7.5, 4: 7.8,
      5: 7.5, 6: 7.0, 7: 6.8, 8: 6.5, 9: 6.0, 10: 5.5, 11: 5.0,
    },
    nmMeterCost: 42000,
    notes: 'Excellent solar resource. Low seasonal variation.',
    fogWarning: false,
  },
  QESCO: {
    name: 'Quetta Electric Supply Company',
    province: 'Balochistan',
    coverage: 'Quetta, Turbat, Khuzdar',
    importRate: 50,
    minBill: 185,
    psh: {
      0: 5.5, 1: 6.2, 2: 7.0, 3: 7.8, 4: 8.0,
      5: 8.2, 6: 7.8, 7: 7.5, 8: 7.0, 9: 6.2, 10: 5.8, 11: 5.5,
    },
    nmMeterCost: 42000,
    notes: "Pakistan's best solar resource. Flat generation year-round. Excellent NM economics.",
    fogWarning: false,
  },
  KE: {
    name: 'K-Electric',
    province: 'Karachi',
    coverage: 'Karachi, Hub (Balochistan)',
    importRate: 52,
    minBill: 200,
    psh: {
      0: 5.8, 1: 6.2, 2: 6.8, 3: 7.5, 4: 7.8,
      5: 7.8, 6: 7.5, 7: 7.2, 8: 7.0, 9: 6.5, 10: 6.0, 11: 5.8,
    },
    nmMeterCost: 45000,
    notes: 'K-Electric is private and follows its own multi-year tariff (2023–2030). NM process goes through KE directly, not NEPRA. KE has been more proactive on solar integration.',
    fogWarning: false,
    keSpecial: true,
  },
};

export const DISCO_KEYS = Object.keys(DISCO_CONFIG);
