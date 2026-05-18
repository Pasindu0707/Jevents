import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Contact } from './components/sections/Contact'
import { FAQ } from './components/sections/FAQ'
import { Features } from './components/sections/Features'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { PlatformFlow } from './components/sections/PlatformFlow'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'
import { TrustedBy } from './components/sections/TrustedBy'
import { useReveal } from './hooks/useReveal'

function App() {
  useReveal()

  return (
    <div id="top" className="theme-transition min-h-dvh bg-[rgb(var(--bg))]">
      <Navbar />

      <Hero onPrimaryCtaClickHref="#contact" onSecondaryCtaClickHref="#platform" />

      <TrustedBy />

      <main id="main" className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <section
          data-reveal="fade-up"
          data-reveal-stagger
          className="glass-card -mt-8 grid gap-4 p-6 md:-mt-12 md:grid-cols-3 md:gap-6 md:p-8"
        >
          {[
            ['Weddings', 'Editorial romance, seamless timelines, calm coordination'],
            ['Corporate', 'Conferences, launches, retreats with brand clarity'],
            ['Social', 'Birthdays, pageants, shows, and private celebrations'],
          ].map(([k, v]) => (
            <article key={k} data-reveal-item className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5">
              <h3 className="font-display text-lg">{k}</h3>
              <p className="mt-2 text-[length:var(--text-small)] leading-relaxed text-[rgb(var(--muted-fg))]">{v}</p>
            </article>
          ))}
        </section>

        <Services />
        <Features />
        <PlatformFlow />
        <Journey />
        <Gallery />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

export default App
