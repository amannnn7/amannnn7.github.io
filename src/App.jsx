import { useState } from 'react'
import { motion, MotionConfig } from 'motion/react'
import Hero3D from './components/Hero3D.jsx'
import { profile, impact, stats, work, projects, experience, skills, extras } from './data/profile.js'

const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
const fmt = (n) => n.toLocaleString('en-IN')

const NAV = [
  ['impact', 'Impact'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
]

function Nav() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-line/70 bg-ink/75 backdrop-blur-md">
      <div className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-amber" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="font-display text-sm font-bold tracking-wide text-text">
          {fullName}
          <span className="text-amber">.</span>
        </a>
        <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted md:flex">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="transition-colors hover:text-text">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-amber px-4 py-1.5 text-sm font-semibold text-ink transition hover:brightness-110"
        >
          Contact
        </a>
      </nav>
    </header>
  )
}

function Button({ href, children, primary }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={
        primary
          ? 'inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-semibold text-ink transition hover:brightness-110'
          : 'inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-text transition hover:border-muted'
      }
    >
      {children}
    </a>
  )
}

function Hero() {
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
  }
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pt-10 pb-12 sm:px-6 md:grid-cols-[1fr_1.15fr] md:pt-16 md:pb-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col gap-5"
        >
          <motion.p variants={item} className="eyebrow">
            {fullName} · {profile.role}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-[2.1rem] leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.6rem]"
          >
            {profile.headline}
          </motion.h1>
          <motion.p variants={item} className="max-w-[58ch] text-lg text-muted">
            {profile.intro}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Button href="#work" primary>
              See the work
            </Button>
            {profile.resumeUrl && <Button href={profile.resumeUrl}>Résumé</Button>}
            <Button href={profile.linkedin}>LinkedIn ↗</Button>
            {profile.github && <Button href={profile.github}>GitHub ↗</Button>}
          </motion.div>
          {profile.openToWork && (
            <motion.div
              variants={item}
              className="flex max-w-fit items-start gap-3 rounded-xl border border-line bg-panel/70 px-4 py-3"
            >
              <span className="relative mt-1.5 flex size-2.5 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber" />
              </span>
              <span className="text-sm">
                <span className="font-medium text-text">Open to {profile.openToRoles.join(' · ')} roles</span>
                <br />
                <span className="text-muted">{profile.openToNote}</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        <div>
          <div className="h-[260px] sm:h-[380px] md:h-[440px]">
            <Hero3D />
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 border-t border-line pt-3 font-mono text-[11px] text-muted sm:text-xs">
            <div>
              <dt className="uppercase tracking-widest">cycle_time</dt>
              <dd className="text-text">30m → 1m</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest">configs/day</dt>
              <dd className="text-text">100+</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest">daily users</dt>
              <dd className="text-text">40+</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="reveal mb-10 flex max-w-2xl flex-col gap-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-2xl leading-tight font-bold sm:text-4xl">{title}</h2>
      {children && <p className="text-muted">{children}</p>}
    </div>
  )
}

function Impact() {
  return (
    <section id="impact" className="border-t border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Impact" title="Minutes, not half-hours">
          The same checks engineers used to run by hand, before and after automation. Bars are drawn to scale.
        </SectionHead>

        <div className="grid gap-10 lg:grid-cols-2">
          {impact.map((row) => (
            <div key={row.label} className="reveal flex flex-col gap-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold">{row.label}</h3>
                <span className="font-mono text-xs text-muted">{row.note}</span>
              </div>
              <div className="grid grid-cols-[4.5rem_1fr_4rem] items-center gap-3 font-mono text-xs">
                <span className="text-muted">before</span>
                <div className="h-3 rounded-sm bg-line">
                  <div className="bar-grow h-full w-full rounded-sm bg-muted/60" />
                </div>
                <span className="text-right tabular-nums text-muted">
                  {row.before} {row.unit}
                </span>
                <span className="text-amber">after</span>
                <div className="h-3 rounded-sm bg-line/40">
                  <div
                    className="bar-grow h-full rounded-sm bg-amber"
                    style={{ width: `${(row.after / row.before) * 100}%` }}
                  />
                </div>
                <span className="text-right tabular-nums text-text">
                  {row.afterLabel ?? row.after} {row.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal flex flex-col-reverse gap-2 border-l border-line pl-4">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-bold tabular-nums text-text sm:text-5xl">
                {fmt(s.value)}
                <span className="text-amber">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Chip({ children }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-muted">
      {children}
    </li>
  )
}

function Work() {
  return (
    <section id="work" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Selected work" title="What I've shipped">
          Internal tools at American Express, described at the level I'm able to share.
        </SectionHead>

        <div className="flex flex-col gap-6">
          {work.map((w) => (
            <article
              key={w.id}
              className="reveal grid gap-6 rounded-2xl border border-line bg-panel/60 p-6 transition-colors hover:border-muted/60 sm:p-8 md:grid-cols-[1fr_1.4fr]"
            >
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs text-muted">{w.org}</p>
                <h3 className="font-display text-xl leading-snug font-bold sm:text-2xl">{w.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {w.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4 text-[15px]">
                <div>
                  <p className="eyebrow mb-1 !text-muted">Problem</p>
                  <p>{w.problem}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1 !text-muted">Built</p>
                  <ul className="flex flex-col gap-1.5">
                    {w.build.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-cyan" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-amber-soft px-4 py-3">
                  <p className="eyebrow mb-1">Result</p>
                  <p className="font-medium text-text">{w.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length > 0 && (
          <div className="mt-16">
            <h3 className="reveal mb-6 font-display text-xl font-bold">Side projects</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="reveal flex flex-col gap-3 rounded-2xl border border-line p-6 transition-colors hover:border-amber"
                >
                  <h4 className="font-semibold">{p.title} ↗</h4>
                  <p className="text-muted">{p.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </ul>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Experience" title="Where I've worked and studied" />
        <ol className="relative flex flex-col gap-10 border-l border-line pl-6 sm:pl-10">
          {experience.map((e) => (
            <li key={e.title} className="reveal relative">
              <span className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-amber bg-ink sm:-left-[45px]" />
              <div className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
                <p className="font-mono text-sm text-muted">{e.when}</p>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    {e.title} <span className="text-muted">· {e.org}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">{e.where}</p>
                  <ul className="flex flex-col gap-1 text-[15px]">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-cyan" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Toolkit" title="What I work with" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="reveal flex flex-col gap-3">
              <h3 className="font-mono text-xs tracking-widest text-amber uppercase">{g.group}</h3>
              <ul className="flex flex-col gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="border-b border-line/60 pb-1.5">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="reveal mt-14 flex flex-col gap-2 text-muted">
          {extras.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-amber">+</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      const el = document.getElementById('email-text')
      const r = document.createRange()
      r.selectNodeContents(el)
      const s = window.getSelection()
      s.removeAllRanges()
      s.addRange(r)
    }
  }
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-24 sm:px-6">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="reveal max-w-3xl font-display text-3xl leading-tight font-bold sm:text-5xl">
          Hiring for data or automation? Let's talk.
        </h2>
        <div className="reveal flex flex-wrap items-center gap-3">
          <span
            id="email-text"
            className="rounded-full border border-line bg-panel px-5 py-2.5 font-mono text-sm select-all sm:text-base"
          >
            {profile.email}
          </span>
          <button
            id="copy-email"
            type="button"
            onClick={copy}
            className="rounded-full bg-amber px-5 py-2.5 font-semibold text-ink transition hover:brightness-110"
          >
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <Button href={profile.linkedin}>LinkedIn ↗</Button>
          {profile.github && <Button href={profile.github}>GitHub ↗</Button>}
        </div>
        <p className="reveal font-mono text-xs text-muted">
          {profile.openToNote}
        </p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Impact />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line px-4 py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {fullName} · Built with React 19, Three.js and Vite
      </footer>
    </MotionConfig>
  )
}
