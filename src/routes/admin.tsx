import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const PASSWORD = "admin114514";
const STORAGE_KEY = "gallery_user_photos_v1";
const AUTH_KEY = "gallery_admin_auth_v1";

export type UserPhoto = { id: string; dataUrl: string; alt: string };

export function loadUserPhotos(): UserPhoto[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserPhoto[]) : [];
  } catch {
    return [];
  }
}

function saveUserPhotos(photos: UserPhoto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
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
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    setPhotos(loadUserPhotos());
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
    const next: UserPhoto[] = [...photos];
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
      setPhotos(next);
      setErr("");
    } catch {
      setErr("Storage full. Remove some photos and try again.");
    }
    setBusy(false);
  }

  function removePhoto(id: string) {
    const next = photos.filter((p) => p.id !== id);
    saveUserPhotos(next);
    setPhotos(next);
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
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              Admin
            </span>
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

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[oklch(0.72_0.18_55)]" />
          <span className="text-sm tracking-[0.2em]">ADMIN</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white"
          >
            View site
          </Link>
          <button
            onClick={logout}
            className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
        <h1 className="text-4xl lg:text-5xl font-light mb-2">Gallery uploads</h1>
        <p className="text-white/50 text-sm mb-10">
          Photos are stored in this browser only (localStorage). Max ~4MB per
          image.
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
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mt-2">
            JPG · PNG · WebP
          </div>
        </label>
        {err && <p className="-mt-8 mb-8 text-xs text-red-400">{err}</p>}

        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
          {photos.length} uploaded
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative group bg-neutral-900">
              <img
                src={p.dataUrl}
                alt={p.alt}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removePhoto(p.id)}
                className="absolute top-2 right-2 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          {photos.length === 0 && (
            <p className="col-span-full text-white/40 text-sm">
              No uploads yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
