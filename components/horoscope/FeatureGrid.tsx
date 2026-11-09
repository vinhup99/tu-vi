import { FEATURES } from '@/constants/features';

export function FeatureGrid() {
  return (
    <section className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FEATURES.map((item) => (
        <div
          key={item.title}
          className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm space-y-2"
        >
          <div className="text-2xl">{item.icon}</div>
          <h3 className="font-bold text-sm text-amber-300">{item.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
