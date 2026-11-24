'use client';

import { CANH_GIO_LIST } from '@/constants/canh-gio';

interface CanhGioPickerProps {
  selectedHour?: number | '';
  onSelect: (hour: number, minute: number) => void;
}

export function CanhGioPicker({ selectedHour, onSelect }: CanhGioPickerProps) {
  // Check xem canh giờ nào đang được chọn
  const isMatchingCanhGio = (canhName: string, hour?: number | '') => {
    if (hour === undefined || hour === '') return false;
    switch (canhName) {
      case 'Tý': return hour === 23 || hour === 0;
      case 'Sửu': return hour === 1 || hour === 2;
      case 'Dần': return hour === 3 || hour === 4;
      case 'Mão': return hour === 5 || hour === 6;
      case 'Thìn': return hour === 7 || hour === 8;
      case 'Tị': return hour === 9 || hour === 10;
      case 'Ngọ': return hour === 11 || hour === 12;
      case 'Mùi': return hour === 13 || hour === 14;
      case 'Thân': return hour === 15 || hour === 16;
      case 'Dậu': return hour === 17 || hour === 18;
      case 'Tuất': return hour === 19 || hour === 20;
      case 'Hợi': return hour === 21 || hour === 22;
      default: return false;
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] text-slate-400">Chọn nhanh theo 12 Canh Giờ cổ truyền:</p>
        <span className="text-[10px] text-amber-400/80">Khung 2 giờ / Canh</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {CANH_GIO_LIST.map((item) => {
          const isActive = isMatchingCanhGio(item.name, selectedHour);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.defaultHour, item.defaultMin)}
              className={`p-2 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'border-amber-400 bg-amber-500/20 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                  : 'border-slate-800 bg-slate-950/60 hover:border-amber-500/40 hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <div
                className={`text-xs font-bold tracking-wide ${
                  isActive ? 'text-amber-300' : 'text-slate-200'
                }`}
              >
                Giờ {item.name}
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5">
                {item.range}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
