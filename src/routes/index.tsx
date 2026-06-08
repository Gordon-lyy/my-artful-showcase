import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import portrait from "../assets/portrait.jpg.asset.json";
import photography from "../assets/photography.jpg.asset.json";
import music from "../assets/music.jpg.asset.json";
import animation from "../assets/animation.jpg.asset.json";
import photoCliff from "../assets/photo-cliff.jpg.asset.json";
import photoStation from "../assets/photo-edinburgh-station.jpg.asset.json";
import photoCastle from "../assets/photo-edinburgh-castle.jpg.asset.json";
import { loadUserPhotos, type UserPhoto } from "./admin";

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
  sub: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
  alt: string;
};

const works: Work[] = [
  {
    id: "photography",
    sub: "02.1",
    title: "Photography",
    caption:
      "Quiet frames from late evenings — instruments, light, and the spaces in between.",
    tag: "Stills",
    image: photography.url,
    alt: "Camera resting on a guitar fretboard",
  },
  {
    id: "music",
    sub: "02.2",
    title: "Echo Chamber",
    caption:
      "Guitar and drums for a small band that plays bigger than it should.",
    tag: "Live",
    image: music.url,
    alt: "Drum kit lit by warm red stage lights",
  },
  {
    id: "animation",
    sub: "02.3",
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

const galleryImages = [
  { src: photography.url, alt: "Camera resting on a guitar fretboard", span: "lg:col-span-2 lg:row-span-2" },
  { src: music.url, alt: "Drum kit lit by warm red stage lights", span: "" },
  { src: animation.url, alt: "Hand-drawn storyboard sketch", span: "" },
  { src: portrait.url, alt: "Portrait holding a guitar", span: "lg:col-span-2" },
  { src: photography.url, alt: "Lens detail", span: "" },
  { src: music.url, alt: "Stage lights", span: "" },
];

function Gallery() {
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

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] lg:auto-rows-[220px] gap-2 lg:gap-3">
          {galleryImages.map((img, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden bg-neutral-900 group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </figure>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/30">
          <span>© {new Date().getFullYear()} Gordon Liu</span>
          <span>Built with care</span>
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
