// ─────────────────────────────────────────────────────────────
//  ALL portfolio content lives in this one file.
//  Edit text here — you never need to touch the components.
//  Fields marked TODO are empty on purpose: fill them in and the
//  matching buttons/sections appear automatically.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: 'Aman',
  lastName: '', // TODO: add your surname — it makes you searchable
  role: 'Data Engineering & Automation',
  location: 'Bengaluru, India',
  email: 'kumaraman9844@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aman-024058231',
  github: 'https://github.com/amannnn7',
  resumeUrl: '', // TODO: drop resume.pdf into /public and set this to './resume.pdf'

  openToWork: true,
  openToRoles: ['Data Engineer', 'Analytics Engineer', 'Data Analyst', 'Python Automation'],
  openToNote: 'Bengaluru, Hyderabad, Pune, Delhi-NCR, Mumbai or remote · 30-day notice',

  headline: 'I automate the slow parts of data work.',
  intro:
    'Apprentice in Automation & Data Operations at American Express. I build Python and Flask validation portals and PostgreSQL ETL pipelines that turn 30-minute manual checks into 1-minute automated runs, used every day by 40+ infrastructure engineers.',
}

// Before → after comparisons. Bars are drawn to scale from these numbers.
export const impact = [
  {
    label: 'IP validation cycle',
    before: 30,
    after: 1,
    unit: 'min',
    note: 'FQDN and ping checks, automated end to end',
  },
  {
    label: 'Storage validation run',
    before: 30,
    after: 2.5,
    afterLabel: '2–3',
    unit: 'min',
    note: '88% faster across 4 storage platforms',
  },
]

export const stats = [
  { value: 1200, suffix: '+', label: 'engineer-hours saved per year (est.)' },
  { value: 88, suffix: '%', label: 'less time per validation run' },
  { value: 100, suffix: '+', label: 'configurations validated daily' },
  { value: 40, suffix: '+', label: 'engineers using the tools daily' },
]

// Work case studies. Keep them problem → build → result.
export const work = [
  {
    id: 'storage-portal',
    title: 'Storage Validation Portal',
    org: 'American Express',
    stack: ['React', 'Flask', 'REST APIs', 'Python'],
    problem:
      'Infrastructure engineers validated storage configurations by hand, platform by platform, with separate tools for each vendor.',
    build: [
      'One portal with REST API integrations to 4 enterprise storage platforms, built so a new platform plugs in without a rewrite',
      'Data-matching engine that compares expected vs. live configuration and reports partial states, not just pass/fail',
      'Execution history stored for traceability and audit',
      'Deployed on enterprise VMs across Dev, E2, E3 and Production environments',
    ],
    result: '88% less time per run (30+ min → 2–3 min) and an estimated 1,200+ hours saved a year. Recognised with an Amex Blue Award.',
  },
  {
    id: 'ip-portal',
    title: 'IP Validation Portal',
    org: 'American Express',
    stack: ['Python', 'Flask'],
    problem: 'Every configuration change needed manual FQDN lookups and ping checks before sign-off.',
    build: [
      'Flask portal that runs FQDN resolution and reachability checks in bulk',
      'Clear per-host status so engineers see exactly what failed and why',
    ],
    result: 'Validation cycle cut from 30 minutes to 1 minute. 40+ engineers validate 100+ configurations a day with it.',
  },
  {
    id: 'reconciliation',
    title: 'ServiceNow ↔ SIMS Reconciliation',
    org: 'American Express',
    stack: ['Python', 'Pandas', 'Reporting'],
    problem: 'Records in two systems of record drifted apart: duplicates, inconsistent fields and broken mappings.',
    build: [
      'Pandas pipeline to compare, clean and de-duplicate records across both sources',
      'Mapping checks to raise accuracy between systems',
      'Automated reports instead of manual spreadsheet comparisons',
    ],
    result: 'Repeatable data-quality checks in place of one-off manual reviews.',
  },
]

// TODO: your own GitHub data projects go here. The section stays hidden while this is empty.
// Example:
// { title: 'NYC Taxi ELT', stack: ['Python', 'PostgreSQL', 'dbt'], summary: 'Daily ELT of 3M rows into a star schema…', link: 'https://github.com/…' },
export const projects = []

export const experience = [
  {
    when: 'Jan 2026 – now',
    title: 'Apprentice, Automation & Data Operations',
    org: 'American Express',
    where: 'Bengaluru · Hybrid',
    points: [
      'Built and deployed the IP and Storage Validation Portals (above)',
      'Presented the storage portal to senior leadership',
      'Took part in the Amex Growth Hack',
    ],
  },
  {
    when: 'Apr – Jun 2025',
    title: 'Frontend Developer Intern',
    org: 'JDB Infotech',
    where: 'Remote',
    points: [
      'Shipped product features and fixed bugs in production code',
      'Wrote unit tests; worked through Git code reviews in an agile team',
    ],
  },
  {
    when: '2021 – 2025',
    title: 'B.E. Computer Science · CGPA 7.5',
    org: 'Chandigarh University',
    where: 'Mohali, Punjab',
    points: ['11 certifications, including the Complete Data Analyst Bootcamp (Udemy, 2025)'],
  },
]

export const skills = [
  { group: 'Data', items: ['Python', 'SQL', 'PostgreSQL', 'Snowflake', 'Pandas', 'ETL pipelines', 'Data validation', 'Reconciliation'] },
  { group: 'Build', items: ['Flask', 'REST APIs', 'React', 'Git'] },
  { group: 'Analytics', items: ['Power BI', 'Tableau', 'Automated reporting'] },
  { group: 'Ship', items: ['Enterprise VM deploys', 'Dev → Prod environments', 'Structured logging', 'SSL & auth debugging'] },
]

export const extras = [
  'Amex Blue Award for the Storage Validation Portal',
  'Share job openings and resume advice with 3,000+ students and freshers on LinkedIn and Instagram',
]
