import { Footer } from '@/features/marketing/components/layout/Footer'
import { Navbar } from '@/features/marketing/components/layout/Navbar'
import { Contact } from '@/features/marketing/components/sections/Contact'
import { FAQ } from '@/features/marketing/components/sections/FAQ'
import { Features } from '@/features/marketing/components/sections/Features'
import { Gallery } from '@/features/marketing/components/sections/Gallery'
import { Hero } from '@/features/marketing/components/sections/Hero'
// import { Journey } from '@/features/marketing/components/sections/Journey'
// import { PlatformFlow } from '@/features/marketing/components/sections/PlatformFlow'
import { Services } from '@/features/marketing/components/sections/Services'
// import { Testimonials } from '@/features/marketing/components/sections/Testimonials'
import { useReveal } from '@/hooks/useReveal'

/**
 * Public marketing site — the homepage at jevents.lk (today: /Jevents/ on
 * GitHub Pages). Lives in its own feature so the future invitation pages
 * (/[slug]) and admin dashboard (/admin) can be added as sibling features.
 */
export function MarketingPage() {
  useReveal()

  return (
    <div id="top" className="theme-transition min-h-dvh bg-[rgb(var(--bg))]">
      <Navbar />

      <Hero onPrimaryCtaClickHref="#contact" />

      <main id="main" className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <Services />
        <Features />
        {/* <PlatformFlow /> */}
        {/* <Journey /> */}
        <Gallery />
        {/* <Testimonials /> */}
        <Contact />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
