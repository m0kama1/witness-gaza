
import { Category, VerificationStatus, Metric, Incident, TimelineEvent, Region, DisplacementPath } from './types';

export const METRICS: Metric[] = [
  {
    id: 'm1',
    label: 'أطفال شهداء/جرحى',
    value: '27,450+',
    trend: 'في ازدياد',
    category: Category.CHILDREN,
    source: 'وزارة الصحة / أوتشا',
    lastUpdated: '2024-05-15',
    status: VerificationStatus.VERIFIED
  },
  {
    id: 'm2',
    label: 'منشآت صحية مستهدفة',
    value: '36/36',
    trend: 'خارج الخدمة',
    category: Category.HEALTHCARE,
    source: 'منظمة الصحة العالمية',
    lastUpdated: '2024-05-12',
    status: VerificationStatus.VERIFIED
  },
  {
    id: 'm3',
    label: 'وحدات سكنية متضررة',
    value: '370,000+',
    trend: '60% إجمالي',
    category: Category.INFRASTRUCTURE,
    source: 'مركز الأمم المتحدة للأقمار الصناعية',
    lastUpdated: '2024-05-10',
    status: VerificationStatus.VERIFIED
  },
  {
    id: 'm4',
    label: 'مواقع ثقافية مدمرة',
    value: '200+',
    trend: 'خسارة لا تعوض',
    category: Category.CULTURAL,
    source: 'اليونسكو / تراث من أجل السلام',
    lastUpdated: '2024-04-30',
    status: VerificationStatus.REPORTED
  }
];

export const INCIDENTS: Incident[] = [
  {
    id: 'i1',
    title: 'حصار مجمع الشفاء الطبي',
    date: '2023-11-15',
    location: 'مدينة غزة',
    region: Region.GAZA_CITY,
    category: Category.HEALTHCARE,
    summary: 'تم محاصرة أكبر مجمع طبي في غزة ودخوله لاحقاً، مما أدى إلى توقف تام للخدمات.',
    impact: 'نزوح مئات المرضى؛ فقدان الرعاية المتخصصة لشمال غزة.',
    legalContext: 'المستشفيات محمية بموجب القانون الدولي الإنساني ما لم تُستخدم لأغراض عسكرية؛ التناسب مطلوب.',
    source: 'رويترز، هيومن رايتس ووتش، منظمة الصحة العالمية',
    coordinates: { x: 35, y: 30 }
  },
  {
    id: 'i2',
    title: 'قصف مخيم جباليا للاجئين',
    date: '2023-10-31',
    location: 'شمال غزة',
    region: Region.NORTH_GAZA,
    category: Category.INFRASTRUCTURE,
    summary: 'استهداف منطقة سكنية عالية الكثافة، مما أدى إلى فوهات ضخمة وانهيارات في المباني.',
    impact: 'خسائر كبيرة في صفوف المدنيين؛ نزوح مئات العائلات.',
    legalContext: 'التمييز بين الأهداف العسكرية والأعيان المدنية أساس القانون الدولي الإنساني.',
    source: 'الجزيرة، أوتشا، منظمة العفو الدولية',
    coordinates: { x: 30, y: 15 }
  },
  {
    id: 'i3',
    title: 'تدمير المسجد العمري الكبير',
    date: '2023-12-08',
    location: 'البلدة القديمة، غزة',
    region: Region.GAZA_CITY,
    category: Category.CULTURAL,
    summary: 'تدمير جزء كبير من المسجد العمري التاريخي جراء غارات جوية.',
    impact: 'فقدان 1,400 عام من التراث الثقافي والديني.',
    legalContext: 'اتفاقية لاهاي لعام 1954 تحمي الممتلكات الثقافية أثناء النزاعات المسلحة.',
    source: 'بي بي سي نيوز، تراث من أجل السلام',
    coordinates: { x: 40, y: 35 }
  },
  {
    id: 'i4',
    title: 'توسيع المنطقة الحدودية في رفح',
    date: '2024-05-07',
    location: 'رفح',
    region: Region.RAFAH,
    category: Category.DISPLACEMENT,
    summary: 'توسع العمليات العسكرية في شرق رفح، مما أدى لنزوح أكثر من مليون شخص.',
    impact: 'تكدس سكاني هائل في منطقة المواصي؛ نقص حاد في وصول المساعدات.',
    legalContext: 'يُحظر التهجير القسري للمدنيين ما لم يكن لسلامتهم أو لأسباب عسكرية ملحة.',
    source: 'الأونروا، لجنة الإنقاذ الدولية',
    coordinates: { x: 75, y: 92 }
  }
];

export const DISPLACEMENT_PATHS: DisplacementPath[] = [
  { id: 'dp1', from: { x: 30, y: 15 }, to: { x: 65, y: 80 }, label: 'من الشمال إلى خان يونس', intensity: 0.9 },
  { id: 'dp2', from: { x: 35, y: 30 }, to: { x: 50, y: 65 }, label: 'من مدينة غزة إلى الوسطى', intensity: 0.7 },
  { id: 'dp3', from: { x: 65, y: 80 }, to: { x: 75, y: 92 }, label: 'من خان يونس إلى رفح', intensity: 0.8 },
];

export const TIMELINE: TimelineEvent[] = [
  { id: 't1', date: '2023-10-07', title: 'بداية التصعيد', description: 'تصعيد هائل أعقب الهجمات الأولية.', category: Category.DISPLACEMENT },
  { id: 't2', date: '2023-11-24', title: 'هدنة السبعة أيام', description: 'هدنة مؤقتة سمحت بتبادل الأسرى ودخول مساعدات محدودة.', category: Category.DISPLACEMENT },
  { id: 't3', date: '2024-01-26', title: 'تدابير محكمة العدل الدولية', description: 'محكمة العدل الدولية تأمر بتدابير لمنع الإبادة الجماعية.', category: Category.CULTURAL },
  { id: 't4', date: '2024-05-06', title: 'تحذير اجتياح رفح', description: 'أوامر بإخلاء مناطق في رفح قبل عملية عسكرية واسعة.', category: Category.DISPLACEMENT },
];
