import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-4xl font-black text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        That page doesn't exist. Try one of our popular compression tools instead.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-[#e5322d] px-6 py-3 font-bold text-white hover:bg-[#c82823]"
      >
        Back to home
      </Link>
    </div>
  );
}
