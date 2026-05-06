import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Gallery } from './components/sections/Gallery'
import { Journey } from './components/sections/Journey'
import { Packages } from './components/sections/Packages'
import { Services } from './components/sections/Services'
import { useReveal } from './hooks/useReveal'

function App() {
  useReveal()

  return (
    <div id="top" className="theme-transition min-h-dvh bg-[rgb(var(--bg))]">
      <Navbar />

      <Hero onPrimaryCtaClickHref="#contact" onSecondaryCtaClickHref="#services" />

      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <section
          data-reveal="fade-up"
          data-reveal-stagger
          className="-mt-10 grid gap-3 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-(--shadow-soft) md:-mt-14 md:grid-cols-3 md:p-8"
        >
          {[
            ['Weddings', 'Editorial romance, logistical clarity'],
            ['Corporate', 'Conferences, launches, retreats'],
            ['Social', 'Birthdays, shows, private celebrations'],
          ].map(([k, v]) => (
            <div key={k} data-reveal-item>
              <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--fg))] uppercase">
                {k}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted-fg))]">
                {v}
              </div>
            </div>
          ))}
        </section>

        <Services />

        <Features />

        <Journey />

        <Gallery />

        <Packages />

        <section
          id="contact"
          data-reveal="fade-up"
          className="mt-10 scroll-mt-28 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-(--shadow-soft) md:mt-12 md:p-10"
        >
          <p className="text-xs font-semibold tracking-[0.24em] text-[rgb(var(--muted-fg))] uppercase">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
            Tell us what you’re planning.
          </h2>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
