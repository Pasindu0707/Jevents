import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Contact } from './components/sections/Contact'
import { FAQ } from './components/sections/FAQ'
import { Features } from './components/sections/Features'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
// import { Journey } from './components/sections/Journey'
// import { PlatformFlow } from './components/sections/PlatformFlow'
import { Services } from './components/sections/Services'
// import { Testimonials } from './components/sections/Testimonials'
import { useReveal } from './hooks/useReveal'

function App() {
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

export default App
