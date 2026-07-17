import { motion, useMotionTemplate, useScroll, useTransform, useAnimationFrame, useMotionValue } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import OrbitImages from './components/OrbitImages'
import './App.css'

const backgroundVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4'

const orbitImagesData = [
  { src: '/flora/twin-tulips.png', name: 'Twin Tulips', number: 'No. 01' },
  { src: '/flora/quiet-garden.png', name: 'Quiet Garden', number: 'No. 02' },
  { src: '/flora/meadow-hymn.png', name: 'Meadow Hymn', number: 'No. 03' },
  { src: '/flora/blue-iris.png', name: 'Blue Iris', number: 'No. 04' },
  { src: '/flora/ember-lily.png', name: 'Ember Lily', number: 'No. 05' },
  { src: '/flora/midnight-bloom.png', name: 'Midnight Bloom', number: 'No. 06' },
]

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const { scrollYProgress: horizontalProgress } = useScroll({ target: horizontalRef, offset: ['start start', 'end end'] })
  const horizontalX = useTransform(horizontalProgress, [0, 1], ['0%', '-50%'])
  const landscapeScale = useTransform(horizontalProgress, [0, 0.5, 1], [1.08, 1, 1.04])
  const journeyProgress = useTransform(horizontalProgress, [0, 1], [0, 1])

  const rx = useTransform(scrollYProgress, [0, 0.08, 1], ['0%', '55%', '55%'])
  const ry = useTransform(scrollYProgress, [0, 0.08, 1], ['0%', '55%', '55%'])
  const clipPath = useMotionTemplate`ellipse(${rx} ${ry} at 50% 50%)`
  const textOpacity = useTransform(scrollYProgress, [0.03, 0.08, 0.15, 0.22, 0.90, 0.98, 1], [0, 1, 1, 0, 0, 1, 1])
  const textBlurVal = useTransform(scrollYProgress, [0.03, 0.08, 0.15, 0.22, 0.90, 0.98, 1], [15, 0, 0, 15, 15, 0, 0])
  const filterText = useMotionTemplate`blur(${textBlurVal}px)`
  const yElement = useTransform(scrollYProgress, [0.03, 0.08, 0.15, 0.22, 0.90, 0.98, 1], [20, 0, 0, 20, 20, 0, 0])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.055, 0.1], [1, 0.8, 0])

  const targetRadius = 650
  const orbitItemSize = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [80, 440, 440, 80, 80])
  const orbitRx = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [330, targetRadius, targetRadius, 330, 330])
  const orbitRy = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [140, targetRadius, targetRadius, 140, 140])
  const orbitRotation = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [-15, 0, 0, -15, -15])
  const orbitTx = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [0, -targetRadius, -targetRadius, 0, 0])
  const focusStrength = useTransform(scrollYProgress, [0.15, 0.25, 0.85, 0.95, 1], [0, 1, 1, 0, 0])
  const orbitProgress = useMotionValue(0)
  const prevScroll = useRef(0)

  useAnimationFrame((_time, delta) => {
    const pos = scrollYProgress.get()
    const scrollDelta = pos - prevScroll.current
    prevScroll.current = pos
    const frameSpeed = pos > 0.15 && pos < 0.85 ? scrollDelta * 200 : (delta / 1000) * 2.5
    orbitProgress.set(orbitProgress.get() + frameSpeed)
  })

  return (
    <main id="top" className="w-full bg-black">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="site-nav-brand" href="#top" aria-label="Feel Alive home">Feel Alive<sup>©</sup></a>
        <div className="site-nav-links">
          <a href="#collection">Archive</a>
          <a href="#elsewhere">Elsewhere</a>
          <a className="site-nav-email" href="mailto:Yousef204b@gmail.com">
            <span className="site-nav-email-full">Yousef204b@gmail.com</span>
            <span className="site-nav-email-short">Email</span>
          </a>
        </div>
      </nav>

      <div id="collection" ref={containerRef} className="relative h-[600vh] w-full">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden text-white">
        <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 z-0 h-full w-full object-cover" aria-hidden="true">
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        <motion.div className="absolute inset-0 z-10" style={{ opacity: heroOpacity }}>
          <h1 className="hero-title">Feel Alive</h1>
          <span className="scroll-cue">Scroll to explore</span>
        </motion.div>

        <motion.div className="absolute z-20 flex items-center justify-center overflow-hidden" style={{ clipPath, rotate: -15, width: '150vw', height: '150vh', left: '-25vw', top: '-25vh' }}>
          <div className="absolute inset-0 bg-[#f5f2e9]" />
          <div className="relative flex h-[100vh] w-[100vw] flex-col items-center justify-center" style={{ transform: 'rotate(15deg)' }}>
            <div className="relative z-0 aspect-square w-[90vw] max-w-[1200px]">
              <OrbitImages images={orbitImagesData} altPrefix="Feel Alive botanical artwork" shape="ellipse" direction="normal" duration={40} fill showPath={false} responsive baseWidth={800} progressOverride={orbitProgress} radiusXOverride={orbitRx} radiusYOverride={orbitRy} itemSizeOverride={orbitItemSize} rotationOverride={orbitRotation} translateXOverride={orbitTx} focusStrength={focusStrength} />
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[60] text-black">
          <div className="absolute left-1/2 top-[48%] z-50 -translate-x-1/2 -translate-y-1/2">
            <motion.div className="flex flex-col items-center whitespace-nowrap" style={{ filter: filterText, opacity: textOpacity }}>
              <div className="font-serif text-[45px] leading-none tracking-tight md:text-[58px]"><span className="italic">F</span>ollow the feeling</div>
              <span className="font-script mt-1 text-[32px] md:text-[42px]">stay curious</span>
            </motion.div>
          </div>

          <motion.div className="absolute right-6 top-28 flex flex-col items-start md:right-[12vw] md:top-32" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
            <span className="font-serif mb-3 text-[40px] leading-none">2K26</span>
            <span className="font-sans text-left text-[11px] font-medium uppercase leading-[18px] tracking-[0.22em]">A study in motion<br />and presence</span>
          </motion.div>

          <motion.div className="absolute bottom-8 left-6 flex flex-col items-start md:bottom-14 md:left-14" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
            <span className="font-serif mb-1 text-[40px] leading-none">001—006</span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em]">Botanical archive</span>
          </motion.div>

          <motion.div className="pointer-events-auto absolute bottom-8 right-6 z-10 hidden w-[245px] flex-col items-start md:bottom-14 md:right-[8vw] md:flex" style={{ y: yElement, filter: filterText, opacity: textOpacity }}>
            <p className="font-sans mb-6 text-left text-[11px] font-medium uppercase leading-[18px] tracking-[0.18em]">A visual collection for people who choose wonder over routine.</p>
            <a href="mailto:Yousef204b@gmail.com" className="group flex items-center text-white" aria-label="Email Yousef">
              <span className="rounded-full bg-black px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-transform group-hover:-translate-x-1">Start something</span>
              <span className="-ml-2 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black transition-transform group-hover:rotate-45"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
            </a>
          </motion.div>
        </div>

          <div className="grain" />
        </div>
      </div>

      <section id="elsewhere" ref={horizontalRef} className="horizontal-journey relative z-[105] h-[300vh] bg-[#d9d4c8]" aria-labelledby="elsewhere-title">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div className="horizontal-track" style={{ x: horizontalX }}>
            <article className="horizontal-intro">
              <div className="horizontal-index">07 / Elsewhere</div>
              <div>
                <p className="horizontal-kicker">A small detour into the wide</p>
                <h2 id="elsewhere-title" className="horizontal-title">Go where<br /><em>the day opens.</em></h2>
              </div>
              <div className="horizontal-direction" aria-hidden="true">Keep moving →</div>
            </article>

            <figure className="horizontal-landscape">
              <motion.img src="/journey/mountain-passage-hd.png" alt="A rider crossing a green alpine meadow beneath a snow-covered mountain" decoding="async" style={{ scale: landscapeScale }} />
              <figcaption>
                <span>Field note No. 07</span>
                <span>Somewhere between stillness and becoming</span>
              </figcaption>
            </figure>

            <article className="horizontal-outro">
              <span className="horizontal-outro-mark">✳</span>
              <p>You were never<br />meant to stay still.</p>
              <span className="horizontal-return">Return to earth ↓</span>
            </article>
          </motion.div>

          <div className="horizontal-progress" aria-hidden="true">
            <motion.span style={{ scaleX: journeyProgress }} />
          </div>
          <div className="grain" />
        </div>
      </section>

      <footer id="contact" className="relative z-[110] min-h-[100svh] overflow-hidden bg-[#f5f2e9] px-5 pb-6 pt-16 text-black md:px-10 md:pb-8 md:pt-24">
        <div className="footer-orbit footer-orbit--one" aria-hidden="true" />
        <div className="footer-orbit footer-orbit--two" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-between">
          <div className="flex items-start justify-between border-t border-black/25 pt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] md:text-[11px]">
            <span>End of collection</span>
            <span>Palestine · Worldwide</span>
          </div>

          <motion.div
            className="my-20 md:my-28"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 max-w-[22rem] font-sans text-[11px] font-medium uppercase leading-[1.7] tracking-[0.18em] md:ml-[50%]">
              Make room for the unexpected. We collaborate with people who believe a feeling can become a world.
            </p>

            <a href="mailto:Yousef204b@gmail.com" className="footer-cta group block" aria-label="Email Yousef">
              <span className="block font-serif text-[clamp(4.8rem,14vw,13rem)] leading-[0.72] tracking-[-0.055em]">
                Let’s make
              </span>
              <span className="flex items-end justify-between gap-4">
                <span className="font-serif text-[clamp(4.8rem,14vw,13rem)] italic leading-[0.82] tracking-[-0.055em]">something.</span>
                <span className="mb-[1vw] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45 md:h-24 md:w-24">
                  <ArrowUpRight className="h-5 w-5 md:h-9 md:w-9" strokeWidth={1.25} />
                </span>
              </span>
            </a>
          </motion.div>

          <div className="grid gap-8 border-t border-black/25 pt-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <div>
              <span className="mb-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-black/55">Inquiries</span>
              <a className="font-serif text-[22px] transition-opacity hover:opacity-55" href="mailto:Yousef204b@gmail.com">Yousef204b@gmail.com</a>
            </div>

            <div className="font-script text-center text-[42px] leading-none md:text-[50px]">Feel Alive</div>

            <div className="flex items-end justify-between gap-8 md:justify-end">
              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-black/55">© 2026</span>
              <a href="#top" className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-55">Back to top ↑</a>
            </div>
          </div>
        </div>

        <div className="grain" />
      </footer>
    </main>
  )
}
