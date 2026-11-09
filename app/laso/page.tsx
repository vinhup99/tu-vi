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

  const name =
    searchParams.get('name')?.trim() || 'Khách Thập Phương';
  const gender = (searchParams.get('gender') === 'female' ? 'female' : 'male') as
    | 'male'
    | 'female';
  const isLunar = searchParams.get('isLunar') === 'true';

  const day = parseInt(searchParams.get('day') || '15', 10) || 15;
  const month = parseInt(searchParams.get('month') || '8', 10) || 8;
  const year = parseInt(searchParams.get('year') || '1995', 10) || 1995;

  const rawHour = searchParams.get('hour');
  const hour =
    rawHour !== null && !isNaN(parseInt(rawHour, 10))
      ? parseInt(rawHour, 10)
      : 10;

  const rawMinute = searchParams.get('minute');
  const minute =
    rawMinute !== null && !isNaN(parseInt(rawMinute, 10))
      ? parseInt(rawMinute, 10)
      : 30;

  const viewYear =
    parseInt(searchParams.get('viewYear') || '2026', 10) || 2026;

  const { laso, error } = useMemo(() => {
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
  }, [name, gender, isLunar, day, month, year, hour, minute]);

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
