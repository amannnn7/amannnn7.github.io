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

// Personal analytics projects. Images live in public/projects/.
// `figures` are read straight off each dashboard — keep them in sync if you rebuild one.
// Add `repo: 'https://github.com/…'` to any project to show a "Code" button.
export const projects = [
  {
    id: 'energy',
    title: 'Global Energy Consumption Pipeline',
    stack: ['AWS S3', 'Snowflake', 'SQL', 'Tableau'],
    image: './projects/energy.webp',
    summary:
      'End-to-end analytics pipeline: household energy data loaded from AWS S3 into Snowflake, transformed with SQL, and visualised in Tableau.',
    points: [
      'Loaded data from S3 into Snowflake using a storage integration and IAM trust policy',
      'Cleaned, transformed and aggregated 1,000 household records in Snowflake SQL',
      'Modelled low, middle and high income-level scenarios with SQL updates to usage and cost savings',
      'Tableau dashboard: consumption (kWh) and cost savings by country, region and energy source',
    ],
    figures: [
      { value: '25', label: 'countries' },
      { value: '5', label: 'energy sources' },
      { value: 'Wind', label: 'highest kWh and savings' },
    ],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7383559729836609536/',
  },
  {
    id: 'insurance',
    title: 'Insurance Claims & Policy Analysis',
    stack: ['Power BI', 'SQL Server', 'DAX', 'Data modelling'],
    image: './projects/insurance.webp',
    summary:
      'Power BI dashboard for an insurance company covering customers, policies and claims, modelled from MS SQL Server.',
    points: [
      'Imported and modelled customer, policy and claim tables from SQL Server',
      'DAX measures for premium, coverage and claim totals and claim status',
      'Slicers by policy, claim and customer; ribbon, bar and line charts; active vs. inactive policies',
      'Travel policies bring in the most premium (2.5M); adults account for the largest claim amount (8.8M)',
    ],
    figures: [
      { value: '10K', label: 'customers' },
      { value: '10.1K', label: 'claims analysed' },
      { value: '5', label: 'policy types' },
    ],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7381592643815890944/',
  },
  {
    id: 'upi',
    title: 'UPI Transactions Analysis',
    stack: ['Power BI', 'DAX', 'Bookmarks', 'Conditional formatting'],
    image: './projects/upi.webp',
    summary:
      'Interactive Power BI report on 2024 UPI transactions across Bangalore, Delhi, Hyderabad and Mumbai.',
    points: [
      'Monthly transaction and balance trends, switchable between line and column views with bookmarks',
      'Ten slicers: bank, city, device, gender, age group, merchant, payment method, purpose and type',
      'City × currency matrix with conditional formatting for amounts and remaining balances',
      'Volume peaked in May (1.71M) and dipped in August (1.60M)',
    ],
    figures: [
      { value: '12', label: 'months of 2024' },
      { value: '4', label: 'cities' },
      { value: '10', label: 'slicers' },
    ],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7381896255297392640/',
  },
  {
    id: 'student',
    title: 'Student Mental-Health Survey Analysis',
    stack: ['SQL Server', 'Tableau', 'Data cleaning'],
    image: './projects/student.webp',
    summary:
      'SQL Server and Tableau analysis of the factors linked to depression in a 502-student survey.',
    points: [
      'Profiled all 13 fields with SQL aggregations and added derived columns such as age group (CASE)',
      'Connected SQL Server live to Tableau',
      'Dashboard comparing academic pressure, financial stress, study satisfaction, sleep and study hours',
    ],
    figures: [
      { value: '502', label: 'survey responses' },
      { value: '13', label: 'fields' },
      { value: '5', label: 'factor views' },
    ],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7382814947090767874/',
  },
]

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
