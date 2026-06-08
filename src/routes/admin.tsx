import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import photoCliff from "../assets/photo-cliff.jpg.asset.json";
import photoStation from "../assets/photo-edinburgh-station.jpg.asset.json";
import photoCastle from "../assets/photo-edinburgh-castle.jpg.asset.json";
import photography from "../assets/photography.jpg.asset.json";
import music from "../assets/music.jpg.asset.json";
import animation from "../assets/animation.jpg.asset.json";

const PASSWORD = "admin114514";
const USER_KEY = "gallery_user_photos_v1";
const HIDDEN_KEY = "gallery_hidden_defaults_v1";
const AUTH_KEY = "gallery_admin_auth_v1";

export type UserPhoto = { id: string; dataUrl: string; alt: string };
export type GalleryPhoto = { id: string; src: string; alt: string; kind: "default" | "user" };

export const DEFAULT_PHOTOS: GalleryPhoto[] = [
  { id: "default-cliff", src: photoCliff.url, alt: "Photographer beneath a cliff, mountain view", kind: "default" },
  { id: "default-castle", src: photoCastle.url, alt: "Edinburgh Castle under dramatic clouds", kind: "default" },
  { id: "default-station", src: photoStation.url, alt: "Edinburgh Waverley station and old town", kind: "default" },
  { id: "default-photography", src: photography.url, alt: "Camera resting on a guitar fretboard", kind: "default" },
  { id: "default-music", src: music.url, alt: "Drum kit lit by warm red stage lights", kind: "default" },
  { id: "default-animation", src: animation.url, alt: "Hand-drawn storyboard sketch", kind: "default" },
];

export function loadUserPhotos(): UserPhoto[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserPhoto[]) : [];
  } catch {
    return [];
  }
}

export function loadHiddenDefaults(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HIDDEN_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function loadGalleryPhotos(): GalleryPhoto[] {
  const hidden = new Set(loadHiddenDefaults());
  const users = loadUserPhotos().map<GalleryPhoto>((p) => ({
    id: p.id,
    src: p.dataUrl,
    alt: p.alt,
    kind: "user",
  }));
  return [...DEFAULT_PHOTOS.filter((p) => !hidden.has(p.id)), ...users];
}

function saveUserPhotos(photos: UserPhoto[]) {
  localStorage.setItem(USER_KEY, JSON.stringify(photos));
}
function saveHiddenDefaults(ids: string[]) {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Gordon Liu" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [userPhotos, setUserPhotos] = useState<UserPhoto[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    setUserPhotos(loadUserPhotos());
    setHidden(loadHiddenDefaults());
  }, []);

  function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pwd === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setErr("");
    } else {
      setErr("Wrong password.");
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    const next: UserPhoto[] = [...userPhotos];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 4 * 1024 * 1024) {
        setErr(`${file.name} > 4MB skipped (localStorage limit).`);
        continue;
      }
      const dataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      next.push({
        id: crypto.randomUUID(),
        dataUrl,
        alt: file.name.replace(/\.[^.]+$/, ""),
      });
    }
    try {
      saveUserPhotos(next);
      setUserPhotos(next);
      setErr("");
    } catch {
      setErr("Storage full. Remove some photos and try again.");
    }
    setBusy(false);
  }

  function removeUserPhoto(id: string) {
    const next = userPhotos.filter((p) => p.id !== id);
    saveUserPhotos(next);
    setUserPhotos(next);
  }

  function hideDefault(id: string) {
    const next = Array.from(new Set([...hidden, id]));
    saveHiddenDefaults(next);
    setHidden(next);
  }

  function restoreDefault(id: string) {
    const next = hidden.filter((x) => x !== id);
    saveHiddenDefaults(next);
    setHidden(next);
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPwd("");
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form
          onSubmit={tryLogin}
          className="w-full max-w-sm border border-white/10 p-8 bg-white/[0.02]"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[oklch(0.72_0.18_55)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Admin</span>
          </div>
          <h1 className="text-2xl font-light mb-6">Enter password</h1>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            autoFocus
            placeholder="Password"
            className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[oklch(0.72_0.18_55)]"
          />
          {err && <p className="mt-3 text-xs text-red-400">{err}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-[oklch(0.72_0.18_55)] text-black text-xs tracking-[0.2em] uppercase py-3 hover:opacity-90"
          >
            Unlock
          </button>
          <Link
            to="/"
            className="mt-6 block text-center text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white"
          >
            ← Back home
          </Link>
        </form>
      </main>
    );
  }

  const visibleDefaults = DEFAULT_PHOTOS.filter((p) => !hidden.includes(p.id));
  const hiddenDefaults = DEFAULT_PHOTOS.filter((p) => hidden.includes(p.id));

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-sm tracking-[0.2em]">ADMIN</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white">
            View site
          </Link>
          <button onClick={logout} className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white">
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
        <h1 className="text-4xl lg:text-5xl font-light mb-2">Gallery uploads</h1>
        <p className="text-white/50 text-sm mb-10">
          Manage every photo shown in the gallery. Uploads live in this browser only (localStorage), max ~4MB each.
        </p>

        <label className="block border border-dashed border-white/20 hover:border-[oklch(0.72_0.18_55)] transition-colors p-10 text-center cursor-pointer mb-12">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="text-sm text-white/80">
            {busy ? "Uploading…" : "Click to select images, or drop files in"}
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mt-2">JPG · PNG · WebP</div>
        </label>
        {err && <p className="-mt-8 mb-8 text-xs text-red-400">{err}</p>}

        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
          Default photos · {visibleDefaults.length} visible
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {visibleDefaults.map((p) => (
            <div key={p.id} className="relative group bg-neutral-900">
              <img src={p.src} alt={p.alt} className="w-full h-48 object-cover" />
              <button
                onClick={() => hideDefault(p.id)}
                className="absolute top-2 right-2 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                Hide
              </button>
            </div>
          ))}
          {visibleDefaults.length === 0 && (
            <p className="col-span-full text-white/40 text-sm">All default photos hidden.</p>
          )}
        </div>

        {hiddenDefaults.length > 0 && (
          <>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
              Hidden defaults · {hiddenDefaults.length}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
              {hiddenDefaults.map((p) => (
                <div key={p.id} className="relative group bg-neutral-900">
                  <img src={p.src} alt={p.alt} className="w-full h-48 object-cover opacity-40" />
                  <button
                    onClick={() => restoreDefault(p.id)}
                    className="absolute top-2 right-2 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-1 hover:bg-[oklch(0.72_0.18_55)] hover:text-black"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
          Your uploads · {userPhotos.length}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {userPhotos.map((p) => (
            <div key={p.id} className="relative group bg-neutral-900">
              <img src={p.dataUrl} alt={p.alt} className="w-full h-48 object-cover" />
              <button
                onClick={() => removeUserPhoto(p.id)}
                className="absolute top-2 right-2 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {userPhotos.length === 0 && (
            <p className="col-span-full text-white/40 text-sm">No uploads yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
