'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gender, HoroscopeFormData } from '@/types/horoscope';
import { CanhGioPicker } from './CanhGioPicker';

export function HoroscopeForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<HoroscopeFormData>({
    name: 'Khách Thập Phương',
    gender: 'male',
    isLunar: false,
    day: 15,
    month: 8,
    year: 1995,
    hour: 10,
    minute: 30,
    viewYear: 2026,
  });

  const handleGenderChange = (gender: Gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleCalendarChange = (isLunar: boolean) => {
    setFormData((prev) => ({ ...prev, isLunar }));
  };

  const handleQuickCanhGio = (hour: number, minute: number) => {
    setFormData((prev) => ({ ...prev, hour, minute }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      name: formData.name.trim() || 'Người Xem',
      gender: formData.gender,
      isLunar: String(formData.isLunar),
      day: String(formData.day),
      month: String(formData.month),
      year: String(formData.year),
      hour: String(formData.hour),
      minute: String(formData.minute),
      viewYear: String(formData.viewYear),
    });

    router.push(`/laso?${query.toString()}`);
  };

  return (
    <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-amber-950/40 backdrop-blur-md relative overflow-hidden">
      {/* Decorative ambient glowing auras */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Họ tên & Giới tính */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-serif">
              Họ và tên gia chủ
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nhập họ và tên..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-slate-100 transition text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-serif">
              Giới tính
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleGenderChange('male')}
                className={`py-2.5 text-sm font-bold rounded-xl border transition-all duration-150 cursor-pointer ${
                  formData.gender === 'male'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 ring-1 ring-amber-300'
                    : 'bg-slate-950/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                ♂ Nam
              </button>
              <button
                type="button"
                onClick={() => handleGenderChange('female')}
                className={`py-2.5 text-sm font-bold rounded-xl border transition-all duration-150 cursor-pointer ${
                  formData.gender === 'female'
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20 ring-1 ring-rose-300'
                    : 'bg-slate-950/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                ♀ Nữ
              </button>
            </div>
          </div>
        </div>

        {/* Lịch sinh & Ngày tháng năm */}
        <div className="border-t border-slate-800/80 pt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-serif">
              Lịch sinh (Âm / Dương)
            </span>
            <div className="inline-flex rounded-xl border border-slate-700 p-1 bg-slate-950/90">
              <button
                type="button"
                onClick={() => handleCalendarChange(false)}
                className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                  !formData.isLunar
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dương lịch
              </button>
              <button
                type="button"
                onClick={() => handleCalendarChange(true)}
                className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                  formData.isLunar
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Âm lịch
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Ngày sinh</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Ngày {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Tháng sinh</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Năm sinh</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
              >
                {Array.from({ length: 110 }, (_, i) => 2030 - i).map((y) => (
                  <option key={y} value={y}>
                    Năm {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Giờ Sinh & Canh Giờ */}
        <div className="border-t border-slate-800/80 pt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-serif">
            Giờ & Phút sinh
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Giờ (0 - 23h)</label>
                <select
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                    <option key={h} value={h}>
                      {h.toString().padStart(2, '0')} giờ
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Phút (0 - 59p)</label>
                <select
                  value={formData.minute}
                  onChange={(e) => setFormData({ ...formData, minute: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                    <option key={m} value={m}>
                      {m.toString().padStart(2, '0')} phút
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Năm xem vận hạn (Lưu niên)
              </label>
              <input
                type="number"
                value={formData.viewYear}
                onChange={(e) => setFormData({ ...formData, viewYear: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium"
              />
            </div>
          </div>

          {/* Canh Giờ Chọn Nhanh có Highlight Active */}
          <CanhGioPicker
            selectedHour={formData.hour}
            onSelect={handleQuickCanhGio}
          />
        </div>

        {/* Nút bấm Lập Lá Số */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/25 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer tracking-wider"
          >
            <span className="text-xl">☯</span>
            <span>LẬP LÁ SỐ TỬ VI</span>
            <span className="text-lg">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
