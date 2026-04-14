export const landingNavLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' }
] as const;

export const heroWords = ['receive', 'route', 'review', 'ship'] as const;

export const heroStats = [
  { value: '5 mins', label: 'to launch an inbox', company: 'OPS' },
  { value: '20/day', label: 'default outbound quota', company: 'LIMITS' },
  { value: '7 days', label: 'message retention window', company: 'CLEANUP' },
  { value: '1 flow', label: 'for inbox + admin', company: 'TEAM' }
] as const;

export const featureCards = [
  {
    number: '01',
    title: 'Inboxes on demand',
    description:
      'Spin up temporary mailboxes for QA, onboarding, growth experiments, and internal tooling without leaving the same workspace.',
    visual: 'deploy'
  },
  {
    number: '02',
    title: 'Structured extraction',
    description:
      'Turn raw verification mail into clear codes, links, and metadata so teammates can act instead of digging through noise.',
    visual: 'ai'
  },
  {
    number: '03',
    title: 'Shared operational surface',
    description:
      'Keep inbox browsing, API access, Telegram notifications, and admin oversight inside one coordinated control plane.',
    visual: 'collab'
  },
  {
    number: '04',
    title: 'Invite-gated governance',
    description:
      'Use quotas, feature flags, and mailbox oversight to keep a public-facing temp-mail service manageable for a small team.',
    visual: 'security'
  }
] as const;

export const workflowSteps = [
  {
    number: 'I',
    title: 'Create or assign a mailbox',
    description: 'Open a mailbox for a test flow, campaign, or teammate in seconds — no manual DNS or inbox juggling required.',
    code: `POST /api/mailboxes\n{\n  "label": "qa-signup"\n}\n\n// Returns { mailbox } for the signed-in user`
  },
  {
    number: 'II',
    title: 'Receive, inspect, and extract',
    description: 'Review messages, attachments, and extracted codes/links from the same interface, whether you are in QA or ops.',
    code: `GET /api/messages?mailboxId=<mailbox-id>\nGET /api/outbound?mailboxId=<mailbox-id>\n\n// UI reads inbox, detail, and outbound history from the same surface`
  },
  {
    number: 'III',
    title: 'Control access centrally',
    description: 'Adjust invites, quotas, feature switches, and mailbox oversight from one admin surface when traffic or abuse patterns change.',
    code: `PATCH /admin/quotas/<user-id>\n{\n  "dailyLimit": 20,\n  "disabled": false\n}\n\n// Admin-only session route`
  }
] as const;

export const infrastructureLocations = [
  { city: 'Cloudflare Workers', region: 'Execution layer', latency: 'edge' },
  { city: 'Pages UI', region: 'Operator surface', latency: 'instant' },
  { city: 'D1 + R2', region: 'Data + attachments', latency: 'bounded' },
  { city: 'Telegram', region: 'Alerting', latency: 'push' },
  { city: 'Resend', region: 'Outbound exception', latency: 'quota' },
  { city: 'Feature flags', region: 'Governance', latency: 'live' }
] as const;

export const metrics = [
  { value: 5, label: 'active mailboxes per user', suffix: '', prefix: '' },
  { value: 7, label: 'message retention days', suffix: '', prefix: '' },
  { value: 20, label: 'daily outbound sends per user', suffix: '', prefix: '' },
  { value: 1, label: 'shared inbox + admin surface', suffix: '', prefix: '' }
] as const;

export const integrations = [
  { name: 'Cloudflare', category: 'Platform' },
  { name: 'Telegram', category: 'Notification' },
  { name: 'Resend', category: 'Outbound mail' },
  { name: 'D1', category: 'Database' },
  { name: 'R2', category: 'Attachments' },
  { name: 'Workers AI', category: 'Extraction fallback' },
  { name: 'GitHub', category: 'Automation' },
  { name: 'Linear', category: 'QA workflow' },
  { name: 'Notion', category: 'Documentation' },
  { name: 'OpenAI', category: 'Agent ops' },
  { name: 'HTTP API', category: 'Programmatic access' },
  { name: 'Feature flags', category: 'Ops control' }
] as const;

export const securityCards = [
  { icon: 'shield', title: 'Invite-only onboarding', description: 'Registration stays gated so public access does not immediately become abuse.' },
  { icon: 'lock', title: 'Session + API boundaries', description: 'Keep browser sessions, API keys, and admin controls clearly separated.' },
  { icon: 'eye', title: 'Mailbox oversight', description: 'See active mailboxes and quotas before a noisy campaign turns into an incident.' },
  { icon: 'file-check', title: 'Operational auditability', description: 'Track what changed, who created access, and when controls were updated.' }
] as const;

export const certifications = ['Invite gated', 'Quota aware', 'Feature flags', 'Mailbox oversight', 'Audit trail'] as const;

export const developerTabs = [
  {
    label: 'Create inbox',
    code: `curl -X POST https://wemail.local/api/mailboxes \\
  -H 'Authorization: Bearer <api-key>' \\
  -H 'Content-Type: application/json' \\
  -d '{"label":"qa-signup"}'`
  },
  {
    label: 'Read messages',
    code: `curl 'https://wemail.local/api/messages?mailboxId=<mailbox-id>' \\
  -H 'Authorization: Bearer <api-key>'`
  },
  {
    label: 'Send outbound',
    code: `curl -X POST https://wemail.local/api/outbound \\
  -H 'Authorization: Bearer <api-key>' \\
  -H 'Content-Type: application/json' \\
  -d '{"mailboxId":"<mailbox-id>","to":"user@example.com","subject":"Test","text":"Hello from wemail"}'`
  }
] as const;

export const developerFeatures = [
  { title: 'HTTP-first automation', description: 'Use API keys to create inboxes, poll messages, and trigger outbound flows from tooling.' },
  { title: 'Extraction-ready payloads', description: 'Keep extracted codes, links, and status alongside the raw message context.' },
  { title: 'Quota-aware workflows', description: 'Respect product limits in automation instead of discovering them after deployment.' },
  { title: 'Operator-friendly defaults', description: 'A small team can manage the whole surface without building a second admin product.' }
] as const;

export const testimonials = [
  {
    quote: 'We stopped screenshotting one-time codes into Slack. QA can now share the same mailbox history and extracted links in one place.',
    author: 'Alicia Tan',
    role: 'QA Lead',
    company: 'Launch Ops',
    metric: 'Fewer inbox handoffs'
  },
  {
    quote: 'Invite controls and quotas meant we could expose the service to teammates without turning it into an unmanaged public drop box.',
    author: 'Marcus Webb',
    role: 'Platform Engineer',
    company: 'Growth Systems',
    metric: 'Safer rollout'
  },
  {
    quote: 'Telegram notifications plus mailbox oversight gave support and operations the same source of truth during launches.',
    author: 'Elena Rodriguez',
    role: 'Operations Manager',
    company: 'Beacon Ops',
    metric: 'Faster incident response'
  },
  {
    quote: 'The UI finally makes temp mail feel like a product, not a pile of scripts and tabs.',
    author: 'James Liu',
    role: 'Founder',
    company: 'Prism Labs',
    metric: 'Cleaner internal workflow'
  }
] as const;

export const pricingPlans = [
  {
    name: 'Starter',
    description: 'For personal QA loops and low-volume testing',
    price: { monthly: 0, annual: 0 },
    features: ['Up to 5 mailboxes', '7-day retention', 'Extraction cards', 'Invite-only access', 'Basic API access'],
    cta: 'Start free',
    popular: false
  },
  {
    name: 'Team',
    description: 'For shared operations, growth, and support workflows',
    price: { monthly: 29, annual: 24 },
    features: [
      'Everything in Starter',
      'Shared admin oversight',
      'Telegram notifications',
      'Outbound send history',
      'Quota management',
      'Feature toggles',
      'Higher throughput'
    ],
    cta: 'Start trial',
    popular: true
  },
  {
    name: 'Control',
    description: 'For teams running a public-facing temp mail service',
    price: { monthly: null, annual: null },
    features: [
      'Everything in Team',
      'Operational policy tuning',
      'Dedicated retention controls',
      'Mailbox oversight workflows',
      'Custom rollout support',
      'Structured launch reviews'
    ],
    cta: 'Talk to ops',
    popular: false
  }
] as const;

export const footerColumns = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#security' }
  ],
  Developers: [
    { name: 'API examples', href: '#developers' },
    { name: 'Automation', href: '#developers' },
    { name: 'Status', href: '#' },
    { name: 'Changelog', href: '#' }
  ],
  Operations: [
    { name: 'Mailbox oversight', href: '#security' },
    { name: 'Quota controls', href: '#pricing' },
    { name: 'Feature flags', href: '#security' },
    { name: 'Contact', href: '#' }
  ],
  Legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Acceptable use', href: '#' }
  ]
} as const;

export const socialLinks = [
  { name: 'GitHub', href: '#' },
  { name: 'Telegram', href: '#' },
  { name: 'Status', href: '#' }
] as const;

export const trustedCompanies = ['Launch Ops', 'Growth Systems', 'Beacon Ops', 'Prism Labs', 'Signal Desk', 'Inbox Studio', 'Edge Support', 'Relay Team'] as const;
