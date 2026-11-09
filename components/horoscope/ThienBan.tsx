import { LaSoInfo } from 'tuvi-neo';

interface ThienBanProps {
  info: LaSoInfo;
  name: string;
  gender: 'male' | 'female';
  solarBirth: string;
  viewYear?: number;
  className?: string;
}

export function ThienBan({
  info,
  name,
  gender,
  solarBirth,
  viewYear,
  className = '',
}: ThienBanProps) {
  return (
    <div
      className={`border-2 border-amber-500/60 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 p-5 lg:p-6 flex flex-col justify-between relative overflow-hidden text-slate-200 shadow-inner print-cell ${className}`}
    >
      {/* Background Yin-Yang symbol watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none text-[180px]">
        ☯
      </div>

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />

      {/* Header */}
      <div className="text-center border-b border-amber-500/30 pb-3 relative z-10">
        <div className="text-[11px] tracking-[0.25em] text-amber-400/90 font-bold uppercase font-serif">
          THIÊN BÀN TỔNG QUAN
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif mt-1 tracking-wider">
          {name}
        </h2>
        <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs">
          <span className="font-semibold text-amber-300">{info.AmDuong}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-medium">
            {gender === 'male' ? '♂ Nam Mạng' : '♀ Nữ Mạng'}
          </span>
        </div>
      </div>

      {/* Central Information Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs py-4 relative z-10">
        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Dương lịch</span>
          <p className="font-bold text-slate-100 text-xs sm:text-sm">{solarBirth}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Âm lịch</span>
          <p className="font-bold text-amber-300 text-xs sm:text-sm">
            Năm {info.Nam} (Tháng {info.Thang}, Ngày {info.Ngay})
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Giờ sinh</span>
          <p className="font-bold text-slate-100 text-xs sm:text-sm">Giờ {info.Gio}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Cục Số</span>
          <p className="font-bold text-amber-300 text-xs sm:text-sm">{info.Cuc}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Chủ Mệnh</span>
          <p className="font-bold text-emerald-400 text-xs sm:text-sm">{info.ChuMenh}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-lg space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Chủ Thân</span>
          <p className="font-bold text-emerald-400 text-xs sm:text-sm">{info.ChuThan}</p>
        </div>

        <div className="col-span-2 bg-slate-950/80 border border-amber-900/40 p-2.5 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Vị trí Thân Cư:</span>
            <span className="font-extrabold text-rose-400 text-sm tracking-wide">
              {info.ThanCu}
            </span>
          </div>

          {viewYear && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Xem hạn:</span>
              <span className="font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700">
                Năm {viewYear}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Notes */}
      <div className="text-center border-t border-amber-500/30 pt-2 text-[10px] text-slate-500 relative z-10 flex items-center justify-between">
        <span>Thuật toán Nam Phái chuẩn xác</span>
        <span className="text-amber-400/80">Nhấp vào ô cung để chiếu Tam Hợp</span>
      </div>
    </div>
  );
}
