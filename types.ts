
export enum Category {
  CHILDREN = 'الأطفال',
  HEALTHCARE = 'الرعاية الصحية',
  INFRASTRUCTURE = 'البنية التحتية',
  CULTURAL = 'المواقع الثقافية',
  DISPLACEMENT = 'النزوح'
}

export enum VerificationStatus {
  VERIFIED = 'تم التحقق',
  REPORTED = 'مبلغ عنه',
  PENDING = 'قيد التحقق'
}

export enum Region {
  NORTH_GAZA = 'شمال غزة',
  GAZA_CITY = 'مدينة غزة',
  MIDDLE_AREA = 'المنطقة الوسطى',
  KHAN_YUNIS = 'خان يونس',
  RAFAH = 'رفح'
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  trend: string;
  category: Category;
  source: string;
  lastUpdated: string;
  status: VerificationStatus;
}

export interface Incident {
  id: string;
  title: string;
  date: string;
  location: string;
  region: Region;
  category: Category;
  summary: string;
  impact: string;
  legalContext: string;
  source: string;
  coordinates: { x: number; y: number };
}

export interface DisplacementPath {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  intensity: number; // 0 to 1
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: Category;
}

export interface EvidenceSubmission {
  id: string;
  userId: string;
  description: string;
  date: string;
  region: Region;
  sourceUrl: string;
  status: VerificationStatus;
  aiVerificationScore?: number;
}
