import Link from "next/link";
export default function NotFound() {
  return <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl font-extrabold">404</h1><p className="mt-2">Halaman tidak ditemukan / Page not found</p><Link className="mt-6 inline-block text-brand-700 underline" href="/id">Beranda / Home</Link></div>;
}
