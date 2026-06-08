import { createFileRoute } from "@tanstack/react-router";
import portrait from "../assets/portrait.jpg.asset.json";
import photography from "../assets/photography.jpg.asset.json";
import music from "../assets/music.jpg.asset.json";
import animation from "../assets/animation.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gordon Liu — Guitarist, Drummer, Visual Storyteller" },
      {
        name: "description",
        content:
          "Personal site of Gordon Liu — student, guitarist and drummer of Echo Chamber, photographer and self-taught animator.",
      },
      { property: "og:title", content: "Gordon Liu" },
      {
        property: "og:description",
        content:
          "Guitarist and drummer of Echo Chamber. Photography, music and animation.",
      },
      { property: "og:image", content: portrait.url },
    ],
  }),
  component: HomePage,
});

function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#reel", label: "Reel" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white">
          <span className="h-2 w-2 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-sm tracking-[0.2em] font-medium">GORDON LIU</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-xs tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors"
            >
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden bg-black"
    >
      <img
        src={portrait.url}
        alt="Portrait of Gordon Liu holding a guitar"
        width={1280}
        height={1600}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)]">
            Portfolio / 2026
          </span>
        </div>
        <h1 className="text-white font-light tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          Gordon Liu.
          <br />
          <span className="text-white/50">Sound. Image. Motion.</span>
        </h1>
        <p className="mt-8 max-w-xl text-white/70 text-base lg:text-lg leading-relaxed">
          Student, guitarist and drummer of the band{" "}
          <span className="text-white">Echo Chamber</span>. I shoot photographs
          and animate things, mostly at night.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 text-[10px] tracking-[0.25em] uppercase text-white/40">
        Scroll ↓
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative bg-black text-white py-28 lg:py-40 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              01 — About
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light leading-tight">
            A student with too many strings attached.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-white/70 leading-relaxed text-lg">
          <p>
            I'm Gordon — I spend most of my time between a fretboard, a drum
            stool, and a camera viewfinder. Music is the loud part of my life;
            photography is the quiet one.
          </p>
          <p>
            With my band <span className="text-white">Echo Chamber</span>, I
            play guitar and drums — sometimes in the same set. When I'm not
            rehearsing, I make small hand-drawn animations to figure out ideas I
            can't say out loud.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {[
              { k: "Guitar", v: "Lead / Rhythm" },
              { k: "Drums", v: "Live sets" },
              { k: "Tools", v: "Camera · Pen" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
                  {s.k}
                </div>
                <div className="mt-2 text-white text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Work = {
  id: string;
  index: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
  alt: string;
};

const works: Work[] = [
  {
    id: "photography",
    index: "02",
    title: "Photography",
    caption:
      "Quiet frames from late evenings — instruments, light, and the spaces in between.",
    tag: "Stills",
    image: photography.url,
    alt: "Camera resting on a guitar fretboard",
  },
  {
    id: "music",
    index: "03",
    title: "Echo Chamber",
    caption:
      "Guitar and drums for a small band that plays bigger than it should.",
    tag: "Live",
    image: music.url,
    alt: "Drum kit lit by warm red stage lights",
  },
  {
    id: "animation",
    index: "04",
    title: "Animation",
    caption:
      "Self-taught experiments in frame-by-frame motion — sketches that learn to move.",
    tag: "Motion",
    image: animation.url,
    alt: "Hand-drawn storyboard sketch on a dark surface",
  },
];

function Work() {
  return (
    <section id="work" className="bg-black text-white py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-light">Three things, on loop.</h2>
          </div>
        </div>

        <div className="space-y-px bg-white/5">
          {works.map((w) => (
            <article
              key={w.id}
              className="group grid lg:grid-cols-12 gap-8 bg-black p-6 lg:p-10 items-center"
            >
              <div className="lg:col-span-7 overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={w.image}
                    alt={w.alt}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="lg:col-span-5 lg:pl-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.3em] text-[oklch(0.72_0.18_55)]">
                    {w.index}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    {w.tag}
                  </span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-light mb-4">{w.title}</h3>
                <p className="text-white/60 leading-relaxed">{w.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reel() {
  return (
    <section
      id="reel"
      className="bg-black text-white py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
            05 — Reel
          </span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-light mb-12">
          Moving pictures.
        </h2>

        <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 border border-white/10">
          <video
            controls
            preload="metadata"
            poster={animation.url}
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-a-drummer-playing-the-drums-7916/1080p.mp4"
              type="video/mp4"
            />
            Your browser does not support video playback.
          </video>
        </div>
        <p className="mt-6 text-sm text-white/40 max-w-xl">
          A short reel — swap this with your own footage anytime.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="bg-black text-white py-28 lg:py-40 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              06 — Contact
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.05]">
            Let's make
            <br />
            <span className="text-white/50">something loud.</span>
          </h2>
        </div>
        <div className="lg:col-span-4 space-y-4 text-sm">
          <a
            href="mailto:hello@gordonliu.example"
            className="block group border-t border-white/10 pt-4"
          >
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
              Email
            </div>
            <div className="mt-1 text-white group-hover:text-[oklch(0.72_0.18_55)] transition-colors">
              hello@gordonliu.example →
            </div>
          </a>
          <a href="#" className="block group border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
              Band
            </div>
            <div className="mt-1 text-white group-hover:text-[oklch(0.72_0.18_55)] transition-colors">
              Echo Chamber →
            </div>
          </a>
          <a href="#" className="block group border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
              Instagram
            </div>
            <div className="mt-1 text-white group-hover:text-[oklch(0.72_0.18_55)] transition-colors">
              @gordon.liu →
            </div>
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-24 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/30">
        <span>© {new Date().getFullYear()} Gordon Liu</span>
        <span>Built with care</span>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Nav />
      <Hero />
      <About />
      <Work />
      <Reel />
      <Contact />
    </main>
  );
}
