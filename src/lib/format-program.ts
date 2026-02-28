/** Client-safe program name formatter — can be imported from 'use client' components */

const PROGRAM_NAMES: Record<string, string> = {
  'CFAPCCA2': 'CFAP Round 2',
  'CFAPCCCCA': 'CFAP CCC Payments (A)',
  'CFAPCARES': 'CFAP CARES Act',
  'CFAP3 - TUP': 'CFAP3 Top-Up Payments',
  'SUPP DISASTER RELIEF NON-SPEC CROPS 1': 'Supp Disaster Relief (Non-Specialty Crops)',
  'TMP/MFP 2019 NON SPECIALTY CROPS': 'Market Facilitation Program 2019',
  'EMGNCY RELIEF PRGM-NONSPECIALITY CROPS': 'Emergency Relief Program',
  'AGRICULTURAL RISK COVERAGE PROG - COUNTY': 'Agriculture Risk Coverage (County)',
  'AGRICULTURAL RISK COVERAGE PROG - INDIVIDUAL': 'Agriculture Risk Coverage (Individual)',
  'CRP PAYMENT - ANNUAL RENTAL': 'CRP Annual Rental',
  'CRP PAYMENT - INCENTIVE': 'CRP Incentive Payment',
  'CRP PAYMENT - SIGNING': 'CRP Signing Incentive',
  'CRP PAYMENT - PRACTICE': 'CRP Practice Incentive',
  'CRP PAYMENT - TRANSITION': 'CRP Transition Incentive',
  'MARKET FACILITATION PROGRAM - CROPS': 'Market Facilitation Program (Crops)',
  'MARKET FACILITATION PROGRAM - NON SPECIALTY CROPS': 'Market Facilitation Program (Non-Specialty)',
}

export function formatProgram(name: string): string {
  if (!name || name === '—') return name
  if (PROGRAM_NAMES[name]) return PROGRAM_NAMES[name]
  return name
    .toLowerCase()
    .replace(/\bcrp\b/g, 'CRP')
    .replace(/\bplc\b/g, 'PLC')
    .replace(/\barc\b/g, 'ARC')
    .replace(/\bmfp\b/g, 'MFP')
    .replace(/\bcfap\b/g, 'CFAP')
    .replace(/\busda\b/g, 'USDA')
    .replace(/\bprgm\b/g, 'Program')
    .replace(/\bprog\b/g, 'Program')
    .replace(/\bemgncy\b/g, 'Emergency')
    .replace(/\bnonspeciality\b/g, 'Non-Specialty')
    .replace(/\btmp\b/g, 'TMP')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/ - /g, ' — ')
}
