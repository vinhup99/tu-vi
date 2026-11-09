export type Gender = 'male' | 'female';

export interface CanhGio {
  name: string;
  range: string;
  defaultHour: number;
  defaultMin: number;
}

export interface HoroscopeFormData {
  name: string;
  gender: Gender;
  isLunar: boolean;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  viewYear: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
