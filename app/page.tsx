import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroBanner } from '@/components/horoscope/HeroBanner';
import { HoroscopeForm } from '@/components/horoscope/HoroscopeForm';
import { FeatureGrid } from '@/components/horoscope/FeatureGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Decorative gradient glow background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-600/30 via-purple-900/10 to-transparent" />

      {/* Main Header */}
      <Header />

      {/* Main Body */}
      <main className="relative z-10 flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <HeroBanner />
        <HoroscopeForm />
        <FeatureGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
