import { generateLaSo, LaSoResult } from 'tuvi-neo';

export interface HoroscopeGenerationInput {
  name: string;
  gender: 'male' | 'female';
  isLunar: boolean;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
}

export const CHI_NAMES = [
  'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị',
  'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi',
];

export const CAN_NAMES = [
  'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu',
  'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý',
];

export const CUNG_DESCRIPTIONS: Record<string, string> = {
  'Mệnh': 'Bản thể, tư chất, tính cách, tướng mạo và đại cương vận mệnh trọn đời.',
  'Phụ mẫu': 'Cha mẹ, phúc ấm gia đình, sự nâng đỡ và di dưỡng từ đấng sinh thành.',
  'Phúc đức': 'Dòng họ, mồ mả tổ tiên, tuổi thọ, đời sống tinh thần và phước báu tích lũy.',
  'Điền trạch': 'Nhà cửa, đất đai, bất động sản, cơ nghiệp tích lũy và hoàn cảnh sinh sống.',
  'Quan lộc': 'Sự nghiệp, công danh, thi cử, năng lực lãnh đạo và con đường công tác.',
  'Nô bộc': 'Bạn bè, đồng sự, cấp dưới, người giúp việc và mạng lưới cộng tác.',
  'Di': 'Môi trường bên ngoài, đi lại, xuất ngoại, giao tiếp xã hội và cơ duyên phương xa.',
  'Tật ách': 'Sức khỏe, thể trạng bẩm sinh, bệnh tật tiềm ẩn và tai ương hoạn nạn.',
  'Tài bạch': 'Tiền bạc, nguồn thu nhập, phong cách kiếm tiền, tiêu tiền và khả năng giữ của.',
  'Tử tức': 'Con cái, số lượng con, nhân duyên, tính tình và sự thành đạt của hậu duệ.',
  'Phu thê': 'Hôn nhân, nhân duyên vợ chồng, tính cách và hoàn cảnh của người bạn đời.',
  'Huynh đệ': 'Anh chị em trong gia đình, sự tương thân tương ái hoặc trở lực tình thân.',
};

/**
 * Service wrapper to generate Horoscope Natal Chart using tuvi-neo
 */
export function calculateHoroscope(params: HoroscopeGenerationInput): LaSoResult {
  return generateLaSo({
    name: params.name,
    gender: params.gender,
    birth: {
      isLunar: params.isLunar,
      year: params.year,
      month: params.month,
      day: params.day,
      hour: params.hour,
      minute: params.minute ?? 0,
    },
  });
}

/**
 * Tính toán Cung Xung Chiếu (cách 6 cung)
 */
export function getXungChieuChi(chi: number): number {
  return (chi + 6) % 12;
}

/**
 * Tính toán 2 Cung Tam Hợp (cách 4 và 8 cung)
 */
export function getTamHopChi(chi: number): [number, number] {
  return [(chi + 4) % 12, (chi + 8) % 12];
}

/**
 * Tính toán Cung Nhị Hợp (Lục Hợp)
 */
export function getNhiHopChi(chi: number): number {
  const pairs: Record<number, number> = {
    0: 1, 1: 0,   // Tý - Sửu
    2: 11, 11: 2, // Dần - Hợi
    3: 10, 10: 3, // Mão - Tuất
    4: 9, 9: 4,   // Thìn - Dậu
    5: 8, 8: 5,   // Tị - Thân
    6: 7, 7: 6,   // Ngọ - Mùi
  };
  return pairs[chi] ?? chi;
}

/**
 * 1: Kim, 2: Thủy, 3: Mộc, 4: Hỏa, 5: Thổ
 */
export function getStarColorClass(hanh: number): string {
  switch (hanh) {
    case 1:
      return 'text-slate-100 font-extrabold drop-shadow-[0_1px_2px_rgba(255,255,255,0.15)]'; // Kim (Trắng sáng)
    case 2:
      return 'text-sky-400 font-extrabold'; // Thủy (Xanh lam)
    case 3:
      return 'text-emerald-400 font-extrabold'; // Mộc (Xanh lục)
    case 4:
      return 'text-rose-400 font-extrabold'; // Hỏa (Đỏ hồng)
    case 5:
      return 'text-amber-400 font-extrabold'; // Thổ (Vàng hoàng thổ)
    default:
      return 'text-slate-300';
  }
}

export function getNguHanhBadge(hanh: number): { name: string; bg: string; text: string } {
  switch (hanh) {
    case 1: return { name: 'Kim', bg: 'bg-slate-800 border-slate-500', text: 'text-slate-200' };
    case 2: return { name: 'Thủy', bg: 'bg-sky-950 border-sky-600', text: 'text-sky-300' };
    case 3: return { name: 'Mộc', bg: 'bg-emerald-950 border-emerald-600', text: 'text-emerald-300' };
    case 4: return { name: 'Hỏa', bg: 'bg-rose-950 border-rose-600', text: 'text-rose-300' };
    case 5: return { name: 'Thổ', bg: 'bg-amber-950 border-amber-600', text: 'text-amber-300' };
    default: return { name: '', bg: '', text: '' };
  }
}
