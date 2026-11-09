'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LaSoResult } from 'tuvi-neo';
import {
  CHI_NAMES,
  CAN_NAMES,
  CUNG_DESCRIPTIONS,
  getXungChieuChi,
  getTamHopChi,
  getNhiHopChi,
  getStarColorClass,
} from '@/lib/tuvi/generate';
import { PalaceCell } from './PalaceCell';
import { ThienBan } from './ThienBan';

interface LaSoBoardProps {
  laso: LaSoResult;
  name: string;
  gender: 'male' | 'female';
  solarBirth: string;
  viewYear?: number;
}

export function LaSoBoard({
  laso,
  name,
  gender,
  solarBirth,
  viewYear,
}: LaSoBoardProps) {
  // Tìm cung Mệnh mặc định
  const menhCung = laso.Cac_cung.find((c) => c.Name === 'Mệnh');
  const defaultSelectedChi = menhCung ? menhCung.ChiCung : 0;

  // State Cung đang click chọn để chiếu Tam Phương Tứ Chính
  const [selectedChi, setSelectedChi] = useState<number | null>(defaultSelectedChi);

  // Map 12 cung theo ChiCung (0: Tý, 1: Sửu, ..., 11: Hợi)
  const cungMap = new Map(laso.Cac_cung.map((c) => [c.ChiCung, c]));

  // Tính quan hệ tương hỗ
  const xungChieuChi = selectedChi !== null ? getXungChieuChi(selectedChi) : null;
  const tamHopChi: number[] = selectedChi !== null ? getTamHopChi(selectedChi) : [];
  const nhiHopChi = selectedChi !== null ? getNhiHopChi(selectedChi) : null;

  // Lấy dữ liệu các cung liên quan
  const currentCung = selectedChi !== null ? cungMap.get(selectedChi) : null;
  const xungChieuCung = xungChieuChi !== null ? cungMap.get(xungChieuChi) : null;
  const tamHopCung1 = tamHopChi[0] !== undefined ? cungMap.get(tamHopChi[0]) : null;
  const tamHopCung2 = tamHopChi[1] !== undefined ? cungMap.get(tamHopChi[1]) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl print-hidden backdrop-blur-md shadow-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-bold transition px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/60"
        >
          <span>←</span>
          <span>Lập lá số khác</span>
        </Link>

        {/* Chú giải Ngũ Hành */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            Ngũ Hành:
          </span>
          <span className="flex items-center gap-1 text-slate-100 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200 shadow-sm" /> Kim
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> Mộc
          </span>
          <span className="flex items-center gap-1 text-sky-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm" /> Thủy
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" /> Hỏa
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" /> Thổ
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedChi !== null && (
            <button
              onClick={() => setSelectedChi(null)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800 bg-slate-950/50 hover:bg-slate-800 transition"
            >
              Bỏ chọn cung
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️</span> In / Lưu PDF
          </button>
        </div>
      </div>

      {/* Thanh Hướng Dẫn Tương Tác Tam Phương Tứ Chính */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 print-hidden">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-base">💡</span>
          <span>
            Nhấp vào bất kỳ ô cung nào để tự động chiếu{' '}
            <strong className="text-amber-300">Tam Phương Tứ Chính</strong> (Cung Xung Chiếu & Tam Hợp).
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Tiêu điểm
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Xung Chiếu
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Tam Hợp
          </span>
          <span className="flex items-center gap-1 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-400" /> Nhị Hợp
          </span>
        </div>
      </div>

      {/* Traditional 4x4 Grid Board */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[920px] border-2 border-amber-600/70 rounded-2xl overflow-hidden shadow-2xl shadow-amber-950/50 bg-slate-950 print-area">
          <div className="grid grid-cols-4 auto-rows-fr gap-[1px] bg-amber-900/40">
            {/* ROW 1: Tị (5), Ngọ (6), Mùi (7), Thân (8) */}
            {cungMap.get(5) && (
              <PalaceCell
                cung={cungMap.get(5)!}
                isTarget={selectedChi === 5}
                isXungChieu={xungChieuChi === 5}
                isTamHop={tamHopChi.includes(5)}
                isNhiHop={nhiHopChi === 5}
                onClick={() => setSelectedChi(5)}
              />
            )}
            {cungMap.get(6) && (
              <PalaceCell
                cung={cungMap.get(6)!}
                isTarget={selectedChi === 6}
                isXungChieu={xungChieuChi === 6}
                isTamHop={tamHopChi.includes(6)}
                isNhiHop={nhiHopChi === 6}
                onClick={() => setSelectedChi(6)}
              />
            )}
            {cungMap.get(7) && (
              <PalaceCell
                cung={cungMap.get(7)!}
                isTarget={selectedChi === 7}
                isXungChieu={xungChieuChi === 7}
                isTamHop={tamHopChi.includes(7)}
                isNhiHop={nhiHopChi === 7}
                onClick={() => setSelectedChi(7)}
              />
            )}
            {cungMap.get(8) && (
              <PalaceCell
                cung={cungMap.get(8)!}
                isTarget={selectedChi === 8}
                isXungChieu={xungChieuChi === 8}
                isTamHop={tamHopChi.includes(8)}
                isNhiHop={nhiHopChi === 8}
                onClick={() => setSelectedChi(8)}
              />
            )}

            {/* ROW 2: Thìn (4), [THIÊN BÀN col-span-2 row-span-2], Dậu (9) */}
            {cungMap.get(4) && (
              <PalaceCell
                cung={cungMap.get(4)!}
                isTarget={selectedChi === 4}
                isXungChieu={xungChieuChi === 4}
                isTamHop={tamHopChi.includes(4)}
                isNhiHop={nhiHopChi === 4}
                onClick={() => setSelectedChi(4)}
              />
            )}
            <ThienBan
              info={laso.Info}
              name={name}
              gender={gender}
              solarBirth={solarBirth}
              viewYear={viewYear}
              className="col-span-2 row-span-2"
            />
            {cungMap.get(9) && (
              <PalaceCell
                cung={cungMap.get(9)!}
                isTarget={selectedChi === 9}
                isXungChieu={xungChieuChi === 9}
                isTamHop={tamHopChi.includes(9)}
                isNhiHop={nhiHopChi === 9}
                onClick={() => setSelectedChi(9)}
              />
            )}

            {/* ROW 3: Mão (3), Tuất (10) */}
            {cungMap.get(3) && (
              <PalaceCell
                cung={cungMap.get(3)!}
                isTarget={selectedChi === 3}
                isXungChieu={xungChieuChi === 3}
                isTamHop={tamHopChi.includes(3)}
                isNhiHop={nhiHopChi === 3}
                onClick={() => setSelectedChi(3)}
              />
            )}
            {cungMap.get(10) && (
              <PalaceCell
                cung={cungMap.get(10)!}
                isTarget={selectedChi === 10}
                isXungChieu={xungChieuChi === 10}
                isTamHop={tamHopChi.includes(10)}
                isNhiHop={nhiHopChi === 10}
                onClick={() => setSelectedChi(10)}
              />
            )}

            {/* ROW 4: Dần (2), Sửu (1), Tý (0), Hợi (11) */}
            {cungMap.get(2) && (
              <PalaceCell
                cung={cungMap.get(2)!}
                isTarget={selectedChi === 2}
                isXungChieu={xungChieuChi === 2}
                isTamHop={tamHopChi.includes(2)}
                isNhiHop={nhiHopChi === 2}
                onClick={() => setSelectedChi(2)}
              />
            )}
            {cungMap.get(1) && (
              <PalaceCell
                cung={cungMap.get(1)!}
                isTarget={selectedChi === 1}
                isXungChieu={xungChieuChi === 1}
                isTamHop={tamHopChi.includes(1)}
                isNhiHop={nhiHopChi === 1}
                onClick={() => setSelectedChi(1)}
              />
            )}
            {cungMap.get(0) && (
              <PalaceCell
                cung={cungMap.get(0)!}
                isTarget={selectedChi === 0}
                isXungChieu={xungChieuChi === 0}
                isTamHop={tamHopChi.includes(0)}
                isNhiHop={nhiHopChi === 0}
                onClick={() => setSelectedChi(0)}
              />
            )}
            {cungMap.get(11) && (
              <PalaceCell
                cung={cungMap.get(11)!}
                isTarget={selectedChi === 11}
                isXungChieu={xungChieuChi === 11}
                isTamHop={tamHopChi.includes(11)}
                isNhiHop={nhiHopChi === 11}
                onClick={() => setSelectedChi(11)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Bảng Phân Tích Tam Phương Tứ Chính Theo Cung Đang Chọn */}
      {currentCung && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 space-y-4 print-hidden shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                ☯
              </span>
              <div>
                <h3 className="text-lg font-bold text-amber-300 font-serif">
                  CUNG {currentCung.Name.toUpperCase()} (Tại {CAN_NAMES[currentCung.CanCung]}{' '}
                  {CHI_NAMES[currentCung.ChiCung]})
                </h3>
                <p className="text-xs text-slate-400">
                  {CUNG_DESCRIPTIONS[currentCung.Name] || 'Cung vị chủ quản trong lá số.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">
                Đại Hạn: <strong className="text-amber-300">{currentCung.SoCuc} tuổi</strong>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">
                Trường Sinh: <strong className="text-slate-200">{currentCung.TrangSinh}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Cột 1: Cung Tiêu Điểm */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  📌 TỌA THỦ (Chính Cung)
                </span>
                <span className="text-[10px] text-slate-400">
                  {CAN_NAMES[currentCung.CanCung]} {CHI_NAMES[currentCung.ChiCung]}
                </span>
              </div>

              <div>
                <span className="text-slate-400">Chính tinh:</span>
                <div className="mt-1 space-y-0.5">
                  {currentCung.ChinhTinh.length > 0 ? (
                    currentCung.ChinhTinh.map((s, idx) => (
                      <span key={idx} className={`${getStarColorClass(s.NguHanh)} mr-2 text-xs`}>
                        {s.Name} ({s.Status || 'Đ'})
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Vô chính diệu</span>
                  )}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-400">Phụ tinh nổi bật:</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {[...currentCung.Saotot, ...currentCung.Saoxau]
                    .map((s) => s.Name)
                    .slice(0, 8)
                    .join(', ') || 'Không có'}
                </p>
              </div>
            </div>

            {/* Cột 2: Cung Xung Chiếu */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 uppercase tracking-wider text-[11px]">
                  ⚡ XUNG CHIẾU (Đối Diện)
                </span>
                {xungChieuCung && (
                  <span className="text-[10px] text-slate-400">
                    Cung {xungChieuCung.Name} ({CAN_NAMES[xungChieuCung.CanCung]}{' '}
                    {CHI_NAMES[xungChieuCung.ChiCung]})
                  </span>
                )}
              </div>

              <div>
                <span className="text-slate-400">Chính tinh hội chiếu:</span>
                <div className="mt-1 space-y-0.5">
                  {xungChieuCung && xungChieuCung.ChinhTinh.length > 0 ? (
                    xungChieuCung.ChinhTinh.map((s, idx) => (
                      <span key={idx} className={`${getStarColorClass(s.NguHanh)} mr-2 text-xs`}>
                        {s.Name} ({s.Status || 'Đ'})
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Vô chính diệu</span>
                  )}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-400">Ý nghĩa xung chiếu:</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Tác động trực tiếp đến môi trường phản kháng, ngoại cảnh tương tác và biến cố đối kháng của cung chính.
                </p>
              </div>
            </div>

            {/* Cột 3: Hai Cung Tam Hợp */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  🌿 TAM HỢP (Hội Tụ)
                </span>
                <span className="text-[10px] text-slate-400">
                  {tamHopCung1?.Name} & {tamHopCung2?.Name}
                </span>
              </div>

              <div>
                <span className="text-slate-400">Chính tinh tam hợp:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {[...(tamHopCung1?.ChinhTinh || []), ...(tamHopCung2?.ChinhTinh || [])].map(
                    (s, idx) => (
                      <span key={idx} className={`${getStarColorClass(s.NguHanh)} text-xs mr-2`}>
                        {s.Name}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <span className="text-slate-400">Ý nghĩa tam hợp:</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Tạo thành thế kiềng 3 chân tương sinh, nâng đỡ và bổ trợ vận khí bền vững cho cung vị bản thể.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
