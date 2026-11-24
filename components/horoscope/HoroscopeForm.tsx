'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gender, HoroscopeFormData } from '@/types/horoscope';
import { CanhGioPicker } from './CanhGioPicker';

export function HoroscopeForm() {
  const router = useRouter();

  // Khởi tạo hoàn toàn trống (không có giá trị mặc định)
  const [formData, setFormData] = useState<HoroscopeFormData>({
    name: '',
    gender: '',
    isLunar: false,
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    viewYear: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Chặn gõ chữ cái và ký tự đặc biệt, chỉ cho phép phím điều khiển và phím số
  const handleDigitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    // Nếu không phải là chữ số 0-9 thì chặn sự kiện gõ phím
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleYearChange = (val: string) => {
    // Lọc sạch toàn bộ ký tự không phải số và giới hạn tối đa 4 chữ số
    const cleanDigits = val.replace(/\D/g, '').slice(0, 4);
    setFormData((prev) => ({
      ...prev,
      year: cleanDigits === '' ? '' : Number(cleanDigits),
    }));
    setErrorMsg(null);
  };

  const handleViewYearChange = (val: string) => {
    const cleanDigits = val.replace(/\D/g, '').slice(0, 4);
    setFormData((prev) => ({
      ...prev,
      viewYear: cleanDigits === '' ? '' : Number(cleanDigits),
    }));
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData((prev) => ({ ...prev, gender }));
    setErrorMsg(null);
  };

  const handleCalendarChange = (isLunar: boolean) => {
    setFormData((prev) => ({ ...prev, isLunar }));
  };

  const handleQuickCanhGio = (hour: number, minute: number) => {
    setFormData((prev) => ({ ...prev, hour, minute }));
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên gia chủ.');
      return;
    }
    if (!formData.gender) {
      setErrorMsg('Vui lòng chọn giới tính (Nam hoặc Nữ).');
      return;
    }
    if (formData.day === '' || formData.month === '' || formData.year === '') {
      setErrorMsg('Vui lòng nhập đầy đủ ngày, tháng và năm sinh.');
      return;
    }
    if (Number(formData.year) < 1900 || Number(formData.year) > 2100) {
      setErrorMsg('Vui lòng nhập năm sinh hợp lệ (từ 1900 đến 2100).');
      return;
    }
    if (formData.hour === '') {
      setErrorMsg('Vui lòng chọn giờ sinh hoặc bấm chọn 1 trong 12 canh giờ bên dưới.');
      return;
    }

    const query = new URLSearchParams({
      name: formData.name.trim(),
      gender: formData.gender,
      isLunar: String(formData.isLunar),
      day: String(formData.day),
      month: String(formData.month),
      year: String(formData.year),
      hour: String(formData.hour),
      minute: String(formData.minute === '' ? 0 : formData.minute),
      viewYear: String(formData.viewYear !== '' ? formData.viewYear : 2026),
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
              Họ và tên gia chủ <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrorMsg(null);
              }}
              placeholder="Nhập họ và tên..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-slate-100 transition text-sm font-medium placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-serif">
              Giới tính <span className="text-rose-400">*</span>
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
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Ngày sinh <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.day}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    day: e.target.value === '' ? '' : Number(e.target.value),
                  });
                  setErrorMsg(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                required
              >
                <option value="" className="text-slate-500">
                  -- Ngày --
                </option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Ngày {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Tháng sinh <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.month}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    month: e.target.value === '' ? '' : Number(e.target.value),
                  });
                  setErrorMsg(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                required
              >
                <option value="" className="text-slate-500">
                  -- Tháng --
                </option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">
                Năm sinh <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={formData.year}
                onKeyDown={handleDigitKeyDown}
                onChange={(e) => handleYearChange(e.target.value)}
                placeholder="VD: 1995"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium placeholder:text-slate-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Giờ Sinh & Canh Giờ */}
        <div className="border-t border-slate-800/80 pt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 font-serif">
            Giờ & Phút sinh <span className="text-rose-400">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">Giờ (0 - 23h)</label>
                <select
                  value={formData.hour}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      hour: e.target.value === '' ? '' : Number(e.target.value),
                    });
                    setErrorMsg(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                  required
                >
                  <option value="" className="text-slate-500">
                    -- Giờ --
                  </option>
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
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      minute: e.target.value === '' ? '' : Number(e.target.value),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium cursor-pointer"
                >
                  <option value="" className="text-slate-500">
                    -- Phút --
                  </option>
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
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={formData.viewYear}
                onKeyDown={handleDigitKeyDown}
                onChange={(e) => handleViewYearChange(e.target.value)}
                placeholder="VD: 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 outline-none text-sm text-slate-100 font-medium placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Canh Giờ Chọn Nhanh có Highlight Active */}
          <CanhGioPicker
            selectedHour={formData.hour}
            onSelect={handleQuickCanhGio}
          />
        </div>

        {/* Thông báo lỗi nếu thiếu trường bắt buộc */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-600/60 text-xs text-rose-300 flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

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
