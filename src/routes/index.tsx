import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import portrait from "../assets/portrait.jpg.asset.json";
import heroBg from "../assets/hero-lines.webp.asset.json";
import workAnimation from "../assets/work-animation.png.asset.json";
import workBand from "../assets/work-band.png.asset.json";
import workSunset from "../assets/work-sunset.jpg.asset.json";
import { loadGalleryPhotos, type GalleryPhoto } from "./admin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gordon Liu — Guitarist, Drummer, Visual Storyteller" },
      {
        name: "description",
        content:
          "Personal site of Gordon Liu — student, guitarist and drummer of Echo Chamber. I enjoy taking photos and creating animations.",
      },
      { property: "og:title", content: "Gordon Liu" },
      {
        property: "og:description",
        content:
          "Guitarist and drummer of Echo Chamber. I enjoy taking photos and creating animations.",
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
    { href: "#gallery", label: "Gallery" },
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
        src={heroBg.url}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[oklch(0.72_0.18_55)]">
            PORTFOLIO
          </span>
        </div>
        <h1 className="text-white font-light tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
          Gordon Liu.
          <br />
          <span className="text-white/50">Key. Frame. Beat.</span>
        </h1>
        <p className="mt-8 max-w-xl text-white/70 text-base lg:text-lg leading-relaxed">
          Student, guitarist and drummer of the band{" "}
          <span className="text-white">Echo Chamber</span>. I enjoy taking photos and creating animations.
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
            A student whose internal RAM is always at 99%.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-white/70 leading-relaxed text-lg">
          <p>
            I'm Gordon — I spend lots of my time between a fretboard, a drum
            stool, and a camera viewfinder. Music is the loud part of my life;
            photography is the quiet one.
          </p>
          <p>
            With my band <span className="text-white">Echo Chamber</span>, I
            play guitar and drums — sometimes in the same set. I will also create some animations using AE when I have free time in daily life.{" "}
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {[
              { k: "Guitar", v: "Lead" },
              { k: "Drums", v: "Want to be Metronome" },
              { k: "PHOTOGRAPHY", v: "Focus" },
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
  sub: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
  alt: string;
};

const works: Work[] = [
  {
    id: "animation",
    sub: "02.1",
    title: "Animation",
    caption:
      "Tinkering with timelines and easing curves — video disguised as magic.",
    tag: "KEY",
    image: workAnimation.url,
    alt: "Hand-drawn sketch of an anime character in a notebook",
  },
  {
    id: "photography-work",
    sub: "02.2",
    title: "Photography",
    caption:
      "Observing the world through a narrow aperture — focus, blur, and the beauty of imperfection.",
    tag: "FRAME",
    image: workSunset.url,
    alt: "Venice skyline at sunset with the Campanile silhouette",
  },
  {
    id: "echo-chamber",
    sub: "02.3",
    title: "Echo Chamber",
    caption:
      "Guitar and drums for a small band that plays bigger than it should.",
    tag: "BEAT",
    image: workBand.url,
    alt: "Group photo of the band Echo Chamber backstage",
  },
];

function Work() {
  return (
    <section id="work" className="bg-black text-white py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              02 — Selected Work
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-light">Three things, on loop.</h2>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {works.map((w) => (
            <article key={w.id} className="group">
              <div className="flex items-center gap-3 mb-6 border-t border-white/10 pt-6">
                <span className="text-[10px] tracking-[0.3em] text-[oklch(0.72_0.18_55)]">
                  {w.sub}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                  {w.tag}
                </span>
              </div>
              <div className="grid lg:grid-cols-12 gap-8 items-center">
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
                  <h3 className="text-3xl lg:text-4xl font-light mb-4">{w.title}</h3>
                  <p className="text-white/60 leading-relaxed">{w.caption}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setPhotos(loadGalleryPhotos());
  }, []);

  const total = photos.length;
  const go = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const prevIdx = total ? (index - 1 + total) % total : 0;
  const nextIdx = total ? (index + 1) % total : 0;

  return (
    <section
      id="gallery"
      className="bg-black text-white py-24 lg:py-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
            03 — Gallery
          </span>
        </div>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-16 leading-[0.95]">
          Through
          <br />
          <span className="text-white/50">the lens.</span>
        </h2>

        {total === 0 ? (
          <p className="text-white/40 text-sm">No photos yet.</p>
        ) : (
          <div className="relative flex items-center justify-center select-none min-h-[60vh] py-8">
            {/* Prev peek — overlaps under main */}
            {total > 1 && (
              <button
                aria-label="Previous photo"
                onClick={() => go(-1)}
                className="absolute z-10 left-[2%] sm:left-[6%] lg:left-[10%] top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
                style={{ filter: "blur(1px)" }}
              >
                <img
                  src={photos[prevIdx].src}
                  alt={photos[prevIdx].alt}
                  className="block w-auto h-auto max-h-[40vh] sm:max-h-[45vh] lg:max-h-[55vh] max-w-[26vw] sm:max-w-[24vw] lg:max-w-[22vw] object-contain"
                />
              </button>
            )}

            {/* Main — on top */}
            <figure className="relative z-20 shadow-2xl shadow-black/70">
              <img
                key={photos[index].id}
                src={photos[index].src}
                alt={photos[index].alt}
                className="block w-auto h-auto max-h-[60vh] sm:max-h-[65vh] lg:max-h-[75vh] max-w-[70vw] sm:max-w-[60vw] lg:max-w-[55vw] object-contain animate-in fade-in duration-500"
              />
            </figure>

            {/* Next peek — overlaps under main */}
            {total > 1 && (
              <button
                aria-label="Next photo"
                onClick={() => go(1)}
                className="absolute z-10 right-[2%] sm:right-[6%] lg:right-[10%] top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
                style={{ filter: "blur(1px)" }}
              >
                <img
                  src={photos[nextIdx].src}
                  alt={photos[nextIdx].alt}
                  className="block w-auto h-auto max-h-[40vh] sm:max-h-[45vh] lg:max-h-[55vh] max-w-[26vw] sm:max-w-[24vw] lg:max-w-[22vw] object-contain"
                />
              </button>
            )}
          </div>
        )}


        {total > 0 && (
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              className="text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white"
            >
              ← Prev
            </button>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={() => go(1)}
              className="text-[10px] tracking-[0.3em] uppercase text-white/60 hover:text-white"
            >
              Next →
            </button>
          </div>
        )}

        <div className="mt-16 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/30">
          <span>© {new Date().getFullYear()} Gordon Liu</span>
          <span>{" "}</span>
        </div>
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
      <Gallery />
    </main>
  );
}
