import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Eye,
  FileCheck,
  Lock,
  Menu,
  Shield,
  X
} from 'lucide-react';

import { WemailLogo } from '../../shared/WemailLogo';
import { AnimatedSphere } from './AnimatedSphere';
import { AnimatedTetrahedron } from './AnimatedTetrahedron';
import { AnimatedWave } from './AnimatedWave';
import {
  certifications,
  developerFeatures,
  developerTabs,
  featureCards,
  footerColumns,
  heroStats,
  heroWords,
  infrastructureLocations,
  integrations,
  landingNavLinks,
  metrics,
  pricingPlans,
  securityCards,
  socialLinks,
  testimonials,
  trustedCompanies,
  workflowSteps
} from './landing-content';
import './landing.css';

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function useAutoIndex(length: number, delay: number, paused = false) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || length <= 1) return;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, delay);
    return () => window.clearInterval(interval);
  }, [delay, length, paused]);

  return [index, setIndex] as const;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver !== 'function') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection({ className, id, children }: { className?: string; id?: string; children: ReactNode }) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className={className} data-visible={isVisible}>
      {children}
    </section>
  );
}

function SectionEyebrow({ children, centered = false }: { children: ReactNode; centered?: boolean }) {
  return (
    <span className={centered ? 'landing-section-eyebrow centered' : 'landing-section-eyebrow'}>
      <span className="landing-section-eyebrow-line" aria-hidden="true" />
      {children}
      {centered ? <span className="landing-section-eyebrow-line" aria-hidden="true" /> : null}
    </span>
  );
}

function FeatureVisual({ type }: { type: (typeof featureCards)[number]['visual'] }) {
  if (type === 'deploy') {
    return (
      <svg viewBox="0 0 200 160" className="landing-feature-visual-svg" aria-hidden="true">
        <rect x="30" y="20" width="140" height="120" rx="14" className="landing-svg-stroke" />
        {[0, 1, 2, 3, 4].map((index) => (
          <rect
            key={index}
            x="44"
            y={36 + index * 18}
            width={110 - index * 12}
            height="10"
            rx="4"
            className="landing-svg-fill landing-svg-bar"
            style={{ ['--bar-delay' as string]: `${index * 120}ms` } as CSSProperties}
          />
        ))}
        <circle cx="100" cy="132" r="5" className="landing-svg-fill landing-svg-pulse" />
      </svg>
    );
  }

  if (type === 'ai') {
    return (
      <svg viewBox="0 0 200 160" className="landing-feature-visual-svg" aria-hidden="true">
        <circle cx="100" cy="80" r="44" className="landing-svg-stroke" />
        <circle cx="100" cy="80" r="20" className="landing-svg-fill-soft landing-svg-pulse" />
        {[0, 1, 2, 3].map((index) => {
          const angle = (Math.PI / 2) * index;
          const x = 100 + Math.cos(angle) * 58;
          const y = 80 + Math.sin(angle) * 58;
          return (
            <g key={index}>
              <line x1="100" y1="80" x2={x} y2={y} className="landing-svg-stroke" />
              <circle cx={x} cy={y} r="8" className="landing-svg-fill-soft" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === 'collab') {
    return (
      <svg viewBox="0 0 200 160" className="landing-feature-visual-svg" aria-hidden="true">
        <rect x="26" y="24" width="148" height="108" rx="18" className="landing-svg-stroke" />
        <rect x="42" y="42" width="52" height="54" rx="12" className="landing-svg-fill-soft" />
        <rect x="106" y="42" width="52" height="36" rx="12" className="landing-svg-fill-soft" />
        <rect x="106" y="88" width="52" height="24" rx="12" className="landing-svg-fill" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 160" className="landing-feature-visual-svg" aria-hidden="true">
      <path d="M100 26 54 46v34c0 32 21 52 46 60 25-8 46-28 46-60V46Z" className="landing-svg-stroke" />
      <path d="m78 82 14 14 28-30" className="landing-svg-stroke landing-svg-check" />
      {[0, 1, 2].map((index) => (
        <circle key={index} cx={68 + index * 32} cy="46" r="5" className="landing-svg-fill-soft landing-svg-pulse" />
      ))}
    </svg>
  );
}

function SecurityIcon({ icon }: { icon: (typeof securityCards)[number]['icon'] }) {
  switch (icon) {
    case 'shield':
      return <Shield aria-hidden="true" />;
    case 'lock':
      return <Lock aria-hidden="true" />;
    case 'eye':
      return <Eye aria-hidden="true" />;
    default:
      return <FileCheck aria-hidden="true" />;
  }
}

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let frame = 0;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="landing-metric-value">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </div>
  );
}

function DesktopNavLinks() {
  return (
    <div className="landing-nav-links" aria-label="Primary section links">
      {landingNavLinks.map((link) => (
        <a key={link.href} href={link.href} className="landing-nav-link">
          {link.label}
        </a>
      ))}
    </div>
  );
}

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.dataset.mobileMenu = 'open';
    } else {
      delete body.dataset.mobileMenu;
    }
    return () => {
      delete body.dataset.mobileMenu;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={isScrolled ? 'landing-nav-shell is-scrolled' : 'landing-nav-shell'}>
      <nav className={isScrolled || isMobileMenuOpen ? 'landing-nav is-floating' : 'landing-nav'} aria-label="landing page navigation">
        <div className={isScrolled ? 'landing-nav-bar compact' : 'landing-nav-bar'}>
          <Link className="landing-brand" to="/">
            <span className="landing-brand-mark">
              <WemailLogo className="landing-brand-logo" />
            </span>
            <span className="landing-brand-copy">
              <strong>wemail</strong>
              <small>TM</small>
            </span>
          </Link>

          <DesktopNavLinks />

          <div className="landing-nav-actions">
            <Link className="landing-nav-action secondary" to="/login">
              登录
            </Link>
            <Link className="landing-nav-action primary" to="/register">
              注册
            </Link>
          </div>

          <button
            aria-controls="landing-mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
            className="landing-mobile-toggle"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            type="button"
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="landing-mobile-menu-backdrop" role="dialog" aria-label="landing mobile menu" aria-modal="true" id="landing-mobile-menu">
          <div className="landing-mobile-menu">
            <div className="landing-mobile-links">
              {landingNavLinks.map((link, index) => (
                <a
                  key={link.href}
                  className="landing-mobile-link"
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ ['--menu-delay' as string]: reducedMotion ? '0ms' : `${index * 70}ms` } as CSSProperties}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="landing-mobile-actions">
              <Link className="landing-nav-action secondary" to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                登录
              </Link>
              <Link className="landing-nav-action primary" to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                注册
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [wordIndex] = useAutoIndex(heroWords.length, 2500, reducedMotion);
  const currentWord = heroWords[wordIndex];

  return (
    <section className="landing-hero-section">
      <div className="landing-hero-orb" aria-hidden="true">
        <AnimatedSphere />
      </div>
      <div className="landing-hero-grid" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={`h-${index}`} className="landing-hero-grid-line horizontal" style={{ top: `${12.5 * (index + 1)}%` }} />
        ))}
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={`v-${index}`} className="landing-hero-grid-line vertical" style={{ left: `${8.33 * (index + 1)}%` }} />
        ))}
      </div>

      <div className="landing-hero-copy-shell">
        <SectionEyebrow>The platform for modern teams</SectionEyebrow>
        <h1 className="landing-hero-title">
          <span>The platform</span>
          <span>
            to{' '}
            <span className="landing-hero-word-wrap">
              <span className="landing-hero-word" key={currentWord}>
                {currentWord.split('').map((character, index) => (
                  <span key={`${currentWord}-${index}`} className="landing-hero-char" style={{ animationDelay: `${index * 55}ms` }}>
                    {character}
                  </span>
                ))}
              </span>
              <span className="landing-hero-word-underline" aria-hidden="true" />
            </span>
          </span>
        </h1>

        <div className="landing-hero-bottom">
          <p className="landing-hero-description">
            Run temporary mail for QA, support, growth, and internal tooling from one surface — with clearer inbox review, extraction, and operational control.
          </p>
          <div className="landing-cta-row">
            <Link className="landing-cta primary" to="/register">
              开始注册
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="landing-cta secondary" to="/login">
              前往登录
            </Link>
          </div>
        </div>
      </div>

      <div className="landing-stats-marquee" aria-label="Platform proof points">
        <div className="landing-marquee-track">
          {Array.from({ length: 2 }).flatMap((_, loopIndex) =>
            heroStats.map((stat) => (
              <article className="landing-stat-chip" key={`${stat.company}-${loopIndex}`}>
                <strong>{stat.value}</strong>
                <span>
                  {stat.label}
                  <em>{stat.company}</em>
                </span>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <RevealSection id="features" className="landing-section landing-section-border-top">
      <div className="landing-section-header left">
        <SectionEyebrow>Capabilities</SectionEyebrow>
        <h2 className="landing-display-title">Everything you need. Nothing you don't.</h2>
        <p className="landing-section-copy">
          Wemail keeps inbox creation, message review, outbound sends, and governance in one product surface instead of scattered scripts and browser tabs.
        </p>
      </div>
      <div className="landing-features-grid">
        {featureCards.map((feature) => (
          <article className="landing-feature-card-next" key={feature.number}>
            <div className="landing-feature-meta">
              <span>{feature.number}</span>
              <div className="landing-feature-visual">
                <FeatureVisual type={feature.visual} />
              </div>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

function HowItWorksSection() {
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useAutoIndex(workflowSteps.length, 5000, reducedMotion);

  return (
    <RevealSection id="how-it-works" className="landing-section landing-section-dark">
      <div className="landing-section-header left on-dark">
        <SectionEyebrow>Process</SectionEyebrow>
        <h2 className="landing-display-title">
          Three steps.
          <br />
          <span className="landing-display-subtle">Infinite possibilities.</span>
        </h2>
      </div>
      <div className="landing-process-layout">
        <div className="landing-process-steps">
          {workflowSteps.map((step, index) => (
            <button
              key={step.number}
              className={activeStep === index ? 'landing-process-step active' : 'landing-process-step'}
              onClick={() => setActiveStep(index)}
              type="button"
            >
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {activeStep === index ? <em className="landing-process-progress" aria-hidden="true" /> : null}
              </div>
            </button>
          ))}
        </div>
        <div className="landing-process-code">
          <header>
            <div className="landing-window-controls" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <small>workflow.ts</small>
          </header>
          <pre>
            <code>{workflowSteps[activeStep]?.code}</code>
          </pre>
          <footer>
            <span className="landing-ready-dot" aria-hidden="true" />
            <small>Ready</small>
          </footer>
        </div>
      </div>
    </RevealSection>
  );
}

function InfrastructureSection() {
  const reducedMotion = useReducedMotion();
  const [activeLocation] = useAutoIndex(infrastructureLocations.length, 2200, reducedMotion);

  return (
    <RevealSection id="infrastructure" className="landing-section">
      <div className="landing-two-column">
        <div>
          <SectionEyebrow>Infrastructure</SectionEyebrow>
          <h2 className="landing-display-title">Global by default.</h2>
          <p className="landing-section-copy">
            Deploy once, run everywhere. Our edge network spans 17 data centers across 6 continents, delivering sub-50ms latency to 99% of the world.
          </p>
          <div className="landing-kpi-row">
            <article>
              <strong>17</strong>
              <span>Data centers</span>
            </article>
            <article>
              <strong>99.99%</strong>
              <span>Uptime SLA</span>
            </article>
            <article>
              <strong>&lt;50ms</strong>
              <span>Global latency</span>
            </article>
          </div>
        </div>
        <div className="landing-location-board">
          {infrastructureLocations.map((location, index) => (
            <article className={index === activeLocation ? 'landing-location-card active' : 'landing-location-card'} key={location.city}>
              <div>
                <strong>{location.city}</strong>
                <span>{location.region}</span>
              </div>
              <em>{location.latency}</em>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function MetricsSection() {
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return (
    <RevealSection id="metrics" className="landing-section landing-section-border-top">
      <div className="landing-section-header centered">
        <SectionEyebrow centered>Metrics</SectionEyebrow>
        <h2 className="landing-display-title">Numbers that move with your team.</h2>
      </div>
      <div className="landing-metrics-grid">
        {metrics.map((metric) => (
          <article className="landing-metric-card" key={metric.label}>
            <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
      <p className="landing-clock">Live snapshot · {time}</p>
    </RevealSection>
  );
}

function IntegrationsSection() {
  return (
    <RevealSection id="integrations" className="landing-section">
      <div className="landing-section-header centered">
        <SectionEyebrow centered>Integrations</SectionEyebrow>
        <h2 className="landing-display-title">Works with everything you already use.</h2>
        <p className="landing-section-copy">Connect the temp-mail workflow to the systems your team already uses for alerts, automation, and rollout control.</p>
      </div>
      <div className="landing-marquee-list">
        <div className="landing-marquee-track">
          {Array.from({ length: 2 }).flatMap((_, loopIndex) =>
            integrations.map((integration) => (
              <article className="landing-integration-card" key={`${integration.name}-${loopIndex}`}>
                <strong>{integration.name}</strong>
                <span>{integration.category}</span>
              </article>
            ))
          )}
        </div>
      </div>
      <div className="landing-marquee-list reverse">
        <div className="landing-marquee-track reverse">
          {Array.from({ length: 2 }).flatMap((_, loopIndex) =>
            [...integrations].reverse().map((integration) => (
              <article className="landing-integration-card" key={`${integration.name}-reverse-${loopIndex}`}>
                <strong>{integration.name}</strong>
                <span>{integration.category}</span>
              </article>
            ))
          )}
        </div>
      </div>
    </RevealSection>
  );
}

function SecuritySection() {
  return (
    <RevealSection id="security" className="landing-section landing-section-muted">
      <div className="landing-two-column security">
        <div>
          <SectionEyebrow>Security</SectionEyebrow>
          <h2 className="landing-display-title">Trust is non-negotiable.</h2>
          <p className="landing-section-copy">
            Invite gating, quota control, and mailbox oversight keep the service usable for real teams instead of turning it into an unmanaged public inbox pool.
          </p>
          <div className="landing-pill-list">
            {certifications.map((certification) => (
              <span key={certification}>{certification}</span>
            ))}
          </div>
        </div>
        <div className="landing-security-grid">
          {securityCards.map((card) => (
            <article className="landing-security-card" key={card.title}>
              <span className="landing-security-icon">
                <SecurityIcon icon={card.icon} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedTab, setCopiedTab] = useState<number | null>(null);

  useEffect(() => {
    if (copiedTab === null) return;
    const timeout = window.setTimeout(() => setCopiedTab(null), 1600);
    return () => window.clearTimeout(timeout);
  }, [copiedTab]);

  async function copyActiveSnippet() {
    const snippet = developerTabs[activeTab]?.code;
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedTab(activeTab);
    } catch {
      setCopiedTab(null);
    }
  }

  return (
    <RevealSection id="developers" className="landing-section landing-section-border-top">
      <div className="landing-two-column developers">
        <div>
          <SectionEyebrow>Developers</SectionEyebrow>
          <h2 className="landing-display-title">Made for fast-moving engineering teams.</h2>
          <p className="landing-section-copy">
            Everything you need to ship faster — from onboarding to deploy — wrapped in an experience that still feels lightweight.
          </p>
          <div className="landing-developer-features">
            {developerFeatures.map((feature) => (
              <article key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="landing-code-card">
          <div className="landing-code-tabs" role="tablist" aria-label="Developer snippets">
            {developerTabs.map((tab, index) => (
              <button
                key={tab.label}
                aria-selected={index === activeTab}
                className={index === activeTab ? 'active' : ''}
                onClick={() => setActiveTab(index)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
            <button className="landing-code-copy" onClick={() => void copyActiveSnippet()} type="button">
              {copiedTab === activeTab ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              <span>{copiedTab === activeTab ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre>
            <code>{developerTabs[activeTab]?.code}</code>
          </pre>
        </div>
      </div>
    </RevealSection>
  );
}

function TestimonialsSection() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useAutoIndex(testimonials.length, 5000, reducedMotion);
  const activeTestimonial = testimonials[activeIndex];

  return (
    <RevealSection id="testimonials" className="landing-section landing-section-border-top landing-testimonials-section">
      <div className="landing-testimonial-header">
        <SectionEyebrow>What people say</SectionEyebrow>
        <span>
          {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </span>
      </div>
      <div className="landing-testimonial-grid">
        <blockquote>
          <p>“{activeTestimonial.quote}”</p>
          <div className="landing-testimonial-author">
            <div className="landing-testimonial-avatar">{activeTestimonial.author.charAt(0)}</div>
            <div>
              <strong>{activeTestimonial.author}</strong>
              <span>
                {activeTestimonial.role}, {activeTestimonial.company}
              </span>
            </div>
          </div>
        </blockquote>
        <aside>
          <div className="landing-testimonial-metric">
            <span>Key Result</span>
            <p>{activeTestimonial.metric}</p>
          </div>
          <div className="landing-testimonial-pills">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.author}
                aria-label={`Show testimonial ${index + 1}`}
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </aside>
      </div>
      <div className="landing-trusted-band">
        <p>Trusted by forward-thinking teams</p>
      </div>
      <div className="landing-trusted-marquee">
        <div className="landing-marquee-track">
          {Array.from({ length: 2 }).flatMap((_, index) =>
            trustedCompanies.map((company) => (
              <span className="landing-trusted-company" key={`${company}-${index}`}>
                {company}
              </span>
            ))
          )}
        </div>
      </div>
    </RevealSection>
  );
}

function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <RevealSection id="pricing" className="landing-section landing-section-border-top">
      <div className="landing-section-header left">
        <SectionEyebrow>Pricing</SectionEyebrow>
        <h2 className="landing-display-title">
          Simple, transparent
          <br />
          <span className="landing-display-subtle stroke">pricing</span>
        </h2>
        <p className="landing-section-copy">Start free and scale as you grow. No hidden fees, no surprises.</p>
      </div>
      <div className="landing-billing-toggle pricing">
        <span className={!isAnnual ? 'active' : ''}>Monthly</span>
        <button
          aria-pressed={isAnnual}
          className={isAnnual ? 'active' : ''}
          onClick={() => setIsAnnual((current) => !current)}
          type="button"
        >
          <span />
        </button>
        <span className={isAnnual ? 'active' : ''}>Annual</span>
        {isAnnual ? <small>Save 17%</small> : null}
      </div>
      <div className="landing-pricing-grid lines">
        {pricingPlans.map((plan, index) => (
          <article className={plan.popular ? 'landing-pricing-card popular' : 'landing-pricing-card'} key={plan.name}>
            {plan.popular ? <p className="landing-pricing-badge">Most Popular</p> : null}
            <span className="landing-pricing-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="landing-pricing-value">
              {plan.price.monthly === null ? (
                <span>Custom</span>
              ) : (
                <>
                  <strong>${isAnnual ? plan.price.annual : plan.price.monthly}</strong>
                  <small>/month</small>
                </>
              )}
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link className={plan.popular ? 'landing-cta primary' : 'landing-cta secondary'} to={plan.popular ? '/register' : '/login'}>
              {plan.cta}
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <p className="landing-pricing-note">
        All plans include automatic updates, HTTPS, and DDoS protection. <a href="#developers">Compare all features</a>
      </p>
    </RevealSection>
  );
}

function CtaSection() {
  return (
    <RevealSection className="landing-section landing-section-cta">
      <div className="landing-cta-panel">
        <div>
          <h2 className="landing-display-title">Ready to build something great?</h2>
          <p className="landing-section-copy">Stand up a clearer temp-mail workflow for testing, launches, and operations — then grow into the controls your team actually needs.</p>
          <div className="landing-cta-row">
            <Link className="landing-cta primary" to="/register">
              Start building free
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="landing-cta secondary" to="/login">
              Talk to ops
            </Link>
          </div>
        </div>
        <div className="landing-cta-visual" aria-hidden="true">
          <AnimatedTetrahedron />
        </div>
      </div>
    </RevealSection>
  );
}

function FooterSection() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-wave" aria-hidden="true">
        <AnimatedWave />
      </div>
      <div className="landing-footer-grid">
        <div className="landing-footer-brand">
          <Link className="landing-brand footer" to="/">
            <span className="landing-brand-mark">
              <WemailLogo className="landing-brand-logo" />
            </span>
            <span className="landing-brand-copy">
              <strong>wemail</strong>
              <small>TM</small>
            </span>
          </Link>
          <p>Temporary mail, extraction, outbound, and admin oversight in one operator-friendly surface.</p>
          <div className="landing-footer-socials">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.name}>
                {link.name}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(footerColumns).map(([title, links]) => (
          <div className="landing-footer-column" key={title}>
            <h3>{title}</h3>
            <ul>
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                  {(link as { badge?: string }).badge ? <span>{(link as { badge?: string }).badge}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="landing-footer-bottom">
        <p>2026 wemail. All rights reserved.</p>
        <span>
          <i aria-hidden="true" />
          All systems operational
        </span>
      </div>
    </footer>
  );
}

export function WemailLandingPage() {
  return (
    <div className="landing-page noise-overlay">
      <Navigation />
      <main className="landing-page-main">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
