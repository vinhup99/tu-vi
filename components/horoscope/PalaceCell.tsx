import { LaSoCung } from 'tuvi-neo';
import { CAN_NAMES, CHI_NAMES, getStarColorClass } from '@/lib/tuvi/generate';

interface PalaceCellProps {
  cung: LaSoCung;
  className?: string;
  isTarget?: boolean;
  isXungChieu?: boolean;
  isTamHop?: boolean;
  isNhiHop?: boolean;
  onClick?: () => void;
}

export function PalaceCell({
  cung,
  className = '',
  isTarget,
  isXungChieu,
  isTamHop,
  isNhiHop,
  onClick,
}: PalaceCellProps) {
  const canChiName = `${CAN_NAMES[cung.CanCung]} ${CHI_NAMES[cung.ChiCung]}`;

  // Highlight style logic
  let borderAndRingClass = 'border-amber-900/50 bg-slate-900/90 hover:border-amber-500/70 hover:bg-slate-900';
  let relationBadge = null;

  if (isTarget) {
    borderAndRingClass =
      'border-amber-400 ring-2 ring-amber-400 bg-amber-950/30 shadow-lg shadow-amber-500/20';
    relationBadge = (
      <span className="text-[9px] font-extrabold px-1 rounded bg-amber-400 text-slate-950 animate-pulse">
        TIÊU ĐIỂM
      </span>
    );
  } else if (isXungChieu) {
    borderAndRingClass =
      'border-sky-400 ring-2 ring-sky-400 bg-sky-950/30 shadow-md shadow-sky-500/15';
    relationBadge = (
      <span className="text-[9px] font-bold px-1 rounded bg-sky-500 text-slate-950">
        XUNG CHIẾU
      </span>
    );
  } else if (isTamHop) {
    borderAndRingClass =
      'border-emerald-400 ring-2 ring-emerald-400 bg-emerald-950/30 shadow-md shadow-emerald-500/15';
    relationBadge = (
      <span className="text-[9px] font-bold px-1 rounded bg-emerald-500 text-slate-950">
        TAM HỢP
      </span>
    );
  } else if (isNhiHop) {
    borderAndRingClass =
      'border-purple-400/80 ring-1 ring-purple-400 bg-purple-950/20';
    relationBadge = (
      <span className="text-[9px] font-medium px-1 rounded bg-purple-900/80 text-purple-200">
        NHỊ HỢP
      </span>
    );
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`border p-2.5 flex flex-col justify-between text-xs relative select-none cursor-pointer transition-all duration-150 print-cell ${borderAndRingClass} ${className}`}
    >
      {/* Cung Header */}
      <div className="flex items-center justify-between border-b border-slate-800/90 pb-1.5 mb-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-extrabold text-amber-300 font-serif text-sm tracking-wide uppercase">
            {cung.Name}
          </span>
          {cung.Than === 1 && (
            <span className="px-1 py-0.2 text-[9px] font-black rounded bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-sm ring-1 ring-rose-400">
              THÂN
            </span>
          )}
          {relationBadge}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {cung.Triet === 1 && (
            <span className="px-1 py-0.2 text-[9px] font-black rounded bg-red-950 text-red-300 border border-red-500 shadow-sm">
              TRIỆT
            </span>
          )}
          {cung.Tuan === 1 && (
            <span className="px-1 py-0.2 text-[9px] font-black rounded bg-amber-950 text-amber-300 border border-amber-500 shadow-sm">
              TUẦN
            </span>
          )}
          <span className="text-[11px] text-slate-400 font-semibold">{canChiName}</span>
        </div>
      </div>

      {/* Cung Body: Chính tinh & Phụ tinh */}
      <div className="flex-1 space-y-2 py-0.5">
        {/* 14 Chính Tinh */}
        <div className="space-y-1">
          {cung.ChinhTinh.length > 0 ? (
            cung.ChinhTinh.map((star, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs leading-tight">
                <span className={`${getStarColorClass(star.NguHanh)} tracking-wide text-[13px]`}>
                  {star.Name}
                </span>
                {star.Status && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1 rounded ${
                      star.Status === 'M' || star.Status === 'V' || star.Status === 'Đ'
                        ? 'text-amber-300 bg-amber-950/60 border border-amber-800'
                        : star.Status === 'H'
                        ? 'text-rose-400 bg-rose-950/60 border border-rose-900'
                        : 'text-slate-400 bg-slate-800'
                    }`}
                  >
                    {star.Status}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="text-[11px] italic text-slate-500 py-1 text-center font-serif">
              — Vô chính diệu —
            </div>
          )}
        </div>

        {/* Tứ Hóa (Lộc, Quyền, Khoa, Kỵ) */}
        {(cung.LocNhap || cung.QuyenNhap || cung.KhoaNhap || cung.KyNhap) && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {cung.LocNhap && (
              <span className="text-[9px] font-bold px-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500">
                Hóa Lộc
              </span>
            )}
            {cung.QuyenNhap && (
              <span className="text-[9px] font-bold px-1 rounded bg-purple-950 text-purple-300 border border-purple-500">
                Hóa Quyền
              </span>
            )}
            {cung.KhoaNhap && (
              <span className="text-[9px] font-bold px-1 rounded bg-sky-950 text-sky-300 border border-sky-500">
                Hóa Khoa
              </span>
            )}
            {cung.KyNhap && (
              <span className="text-[9px] font-bold px-1 rounded bg-rose-950 text-rose-300 border border-rose-500">
                Hóa Kỵ
              </span>
            )}
          </div>
        )}

        {/* 2 Cột Phụ Tinh: Cát Tinh & Hung Tinh */}
        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1.5 border-t border-slate-800/80">
          {/* Cát Tinh (Sao Tốt) */}
          <div className="space-y-0.5">
            <div className="text-[9px] text-emerald-500/70 font-semibold tracking-wider uppercase mb-0.5">
              Cát Tinh
            </div>
            {cung.Saotot.map((s, idx) => (
              <div key={idx} className="text-emerald-300/90 truncate flex items-center justify-between" title={s.Name}>
                <span>{s.Name}</span>
                {s.Status && <span className="text-[9px] text-emerald-500 font-mono">({s.Status})</span>}
              </div>
            ))}
          </div>

          {/* Hung Tinh (Sao Xấu) */}
          <div className="space-y-0.5">
            <div className="text-[9px] text-rose-500/70 font-semibold tracking-wider uppercase mb-0.5">
              Hung Tinh
            </div>
            {cung.Saoxau.map((s, idx) => (
              <div key={idx} className="text-rose-400/90 truncate flex items-center justify-between" title={s.Name}>
                <span>{s.Name}</span>
                {s.Status && <span className="text-[9px] text-rose-500 font-mono">({s.Status})</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cung Footer: Đại Hạn, Trường Sinh, Tiểu Hạn */}
      <div className="flex items-center justify-between border-t border-slate-800/90 pt-1.5 mt-1 text-[10px]">
        <span className="font-extrabold text-amber-400 text-xs" title="Đại Hạn">
          {cung.SoCuc}
        </span>
        <span className="italic text-slate-300 font-serif" title="Vòng Trường Sinh">
          {cung.TrangSinh}
        </span>
        <span className="text-slate-400 font-medium" title="Tiểu Hạn">
          {cung.TieuHan || CHI_NAMES[cung.ChiCung]}
        </span>
      </div>
    </div>
  );
}
