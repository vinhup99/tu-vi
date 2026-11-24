'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LaSoBoard } from '@/components/horoscope/LaSoBoard';
import { calculateHoroscope } from '@/lib/tuvi/generate';

function LaSoView() {
  const searchParams = useSearchParams();

  const rawDay = searchParams.get('day');
  const rawMonth = searchParams.get('month');
  const rawYear = searchParams.get('year');
  const hasRequiredDate = Boolean(rawDay && rawMonth && rawYear);

  const name = searchParams.get('name')?.trim() || 'Người Xem';
  const rawGender = searchParams.get('gender');
  const gender = (rawGender === 'female' ? 'female' : 'male') as 'male' | 'female';
  const isLunar = searchParams.get('isLunar') === 'true';

  const day = parseInt(rawDay || '1', 10);
  const month = parseInt(rawMonth || '1', 10);
  const year = parseInt(rawYear || '2000', 10);

  const rawHour = searchParams.get('hour');
  const hour =
    rawHour !== null && !isNaN(parseInt(rawHour, 10))
      ? parseInt(rawHour, 10)
      : 0;

  const rawMinute = searchParams.get('minute');
  const minute =
    rawMinute !== null && !isNaN(parseInt(rawMinute, 10))
      ? parseInt(rawMinute, 10)
      : 0;

  const viewYear =
    parseInt(searchParams.get('viewYear') || '2026', 10) || 2026;

  const { laso, error } = useMemo(() => {
    if (!hasRequiredDate) {
      return { laso: null, error: null };
    }
    try {
      const result = calculateHoroscope({
        name,
        gender,
        isLunar,
        day,
        month,
        year,
        hour,
        minute,
      });
      return { laso: result, error: null };
    } catch (err: unknown) {
      console.error('Lỗi khi tính toán lá số:', err);
      const message = err instanceof Error ? err.message : 'Dữ liệu ngày giờ sinh không hợp lệ';
      return { laso: null, error: message };
    }
  }, [hasRequiredDate, name, gender, isLunar, day, month, year, hour, minute]);

  // Kiểm tra nếu người dùng truy cập trực tiếp chưa nhập thông tin
  if (!hasRequiredDate) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-slate-900/90 border border-amber-500/40 text-center space-y-4 shadow-2xl">
        <div className="text-5xl">☯</div>
        <h2 className="text-xl font-bold text-amber-300 font-serif">
          Chưa Có Thông Tin Lá Số
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Bạn chưa nhập thông tin ngày tháng năm và giờ sinh. Vui lòng quay lại trang chủ để nhập thông tin và lập lá số.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            ← Về Trang Chủ Nhập Thông Tin
          </Link>
        </div>
      </div>
    );
  }

  if (error || !laso) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 rounded-2xl bg-slate-900/90 border border-rose-500/40 text-center space-y-4">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-lg font-bold text-rose-300 font-serif">
          Không thể an sao lá số
        </h2>
        <p className="text-xs text-slate-300">
          {error || 'Đã xảy ra lỗi trong quá trình tính toán. Vui lòng kiểm tra lại ngày giờ sinh.'}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
          >
            ← Quay lại nhập lại thông tin
          </Link>
        </div>
      </div>
    );
  }

  const calendarLabel = isLunar ? 'Âm lịch' : 'Dương lịch';
  const solarBirthStr = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year} (${calendarLabel}) lúc ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  return (
    <LaSoBoard
      laso={laso}
      name={name}
      gender={gender}
      solarBirth={solarBirthStr}
      viewYear={viewYear}
    />
  );
}

export default function LaSoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 container mx-auto px-2 sm:px-4 py-6 max-w-6xl">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="text-5xl animate-spin text-amber-400">☯</div>
              <p className="text-amber-300 font-serif text-lg tracking-wider">
                Đang tính toán an sao và lập lá số...
              </p>
            </div>
          }
        >
          <LaSoView />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
