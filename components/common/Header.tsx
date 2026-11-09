import Link from 'next/link';

export function Header() {
  return (
    <header className="relative z-10 border-b border-amber-900/40 bg-slate-950/80 backdrop-blur-md sticky top-0 px-4 lg:px-8 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
          ☯
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wider text-amber-300 font-serif">
            TỬ VI ĐẨU SỐ
          </h1>
          <p className="text-[11px] text-slate-400">Thuật toán Nam Phái truyền thống</p>
        </div>
      </Link>

      <nav className="flex items-center gap-6 text-sm text-slate-300">
        <span className="hidden md:inline-flex text-xs px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-medium">
          ☯ Nam Phái Cổ Truyền
        </span>
      </nav>
    </header>
  );
}
