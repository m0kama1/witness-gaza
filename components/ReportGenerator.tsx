
import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, Layout, List, Calendar } from 'lucide-react';

interface ReportGeneratorProps {
  onClose: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-right">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900 flex-row-reverse">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 flex-row-reverse">
            <FileText className="w-5 h-5 text-red-500" />
            مولد التقارير
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full text-zinc-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-2">
                <h4 className="text-lg font-bold">اختر هيكل التقرير</h4>
                <p className="text-sm text-zinc-400">اختر عمق ونوع المعلومات التي ترغب في تضمينها في المستند المصدر.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Layout, title: "ملخص تنفيذي", desc: "أهم المؤشرات والرسوم البيانية" },
                  { icon: List, title: "سجل الأدلة", desc: "سجلات مفصلة لجميع الحوادث" },
                  { icon: Calendar, title: "تحليل الخط الزمني", desc: "التسلسل الزمني للأحداث" },
                  { icon: FileText, title: "ملف كامل", desc: "مجموعة البيانات الكاملة والمراجع" },
                ].map((option, i) => (
                  <button 
                    key={i}
                    onClick={() => setStep(2)}
                    className="p-4 bg-white/5 border border-white/5 rounded-2xl text-right hover:bg-white/10 hover:border-white/20 transition-all space-y-3 group"
                  >
                    <div className="p-2 w-fit bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                      <option.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{option.title}</h5>
                      <p className="text-[10px] text-zinc-500">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-left-2 duration-300">
              <div className="space-y-2">
                <h4 className="text-lg font-bold">تأكيد معايير التصدير</h4>
                <p className="text-sm text-zinc-400">جاري إعداد تقرير منظم مع حالة التحقق المباشرة والبيانات الوصفية.</p>
              </div>

              <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between text-sm flex-row-reverse">
                  <span className="text-zinc-500">التنسيق</span>
                  <span className="text-white font-mono">PDF (مستند قياسي)</span>
                </div>
                <div className="flex justify-between text-sm flex-row-reverse">
                  <span className="text-zinc-500">عدد الأدلة</span>
                  <span className="text-white font-mono">24 سجلاً موثقاً</span>
                </div>
                <div className="flex justify-between text-sm flex-row-reverse">
                  <span className="text-zinc-500">نوع المرجع</span>
                  <span className="text-white font-mono">Harvard (معيار قانوني)</span>
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all"
                >
                  رجوع
                </button>
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-2 py-3 px-8 bg-white text-black rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all disabled:opacity-50 flex-row-reverse"
                >
                  {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {isExporting ? "جاري تجميع التوثيق..." : "توليد التقرير"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">التقرير جاهز</h4>
                <p className="text-sm text-zinc-400">تم إنشاء تقرير التوثيق الخاص بك وهو جاهز للتحميل.</p>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={onClose}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all"
                >
                  تحميل التقرير
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-zinc-500 hover:text-white text-xs font-bold transition-all"
                >
                  إنشاء تقرير آخر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Helper for Step 2
const RefreshCw: React.FC<{className?: string}> = ({className}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default ReportGenerator;
