
import React, { useState } from 'react';
import { Upload, Shield, CheckCircle, Info, ArrowLeft, ShieldCheck, Cpu, UserCheck } from 'lucide-react';
import { Region, VerificationStatus } from '../types';

const ContributionPortal: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    region: Region.GAZA_CITY,
    sourceUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // Simulate AI check
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-700 text-right">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info/Workflow */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">مساهمة الشاهد</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              نحن نعتمد على التقارير الميدانية والأدلة الرقمية الموثقة لتوثيق آثار حقوق الإنسان. تدخل مساهمتك في مسار تحقق صارم.
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">مسار التحقق</h3>
            <div className="space-y-4">
              {[
                { icon: Cpu, title: "فحص النزاهة بالذكاء الاصطناعي", desc: "تحليل آلي لصحة البيانات الوصفية واكتشاف التكرار." },
                { icon: UserCheck, title: "مراجعة الخبراء", desc: "يقوم محققو حقوق الإنسان بسياق وتأكيد المصادر." },
                { icon: ShieldCheck, title: "النشر النهائي", desc: "دمج البيانات في لوحة التحكم وخريطة الأدلة." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 flex-row-reverse">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-300">{item.title}</h4>
                    <p className="text-[10px] text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Submission Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 h-full">
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">وصف الحادثة</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="صف ما حدث، الأثر الإنساني، وعلامات الموقع المحددة..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 min-h-[120px] text-right"
                    dir="rtl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">تاريخ الحدث</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">المنطقة</label>
                    <select 
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value as Region})}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 text-zinc-300"
                    >
                      {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">مصدر الدليل (رابط / مرجع)</label>
                  <input 
                    type="url" 
                    required
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
                    placeholder="رابط فيديو، منشور اجتماعي، أو تقرير رسمي..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 text-right"
                  />
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3 flex-row-reverse">
                  <Info className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-[10px] text-amber-200/60 leading-relaxed">
                    عن طريق الإرسال، فإنك تؤكد أن هذه البيانات تتم مشاركتها لأغراض التوثيق الإنساني. قد يتصل بك فريقنا لمزيد من التحقق إذا لزم الأمر.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all flex-row-reverse"
                >
                  إرسال للتحقق
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 text-center py-20 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">تحليل الذكاء الاصطناعي جارٍ</h3>
                  <p className="text-sm text-zinc-500 max-w-xs mx-auto">نقوم بمقارنة بيانات الأقمار الصناعية والتقارير الحالية لمنع التكرار.</p>
                </div>
                <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 text-center py-20 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">تم الإرسال بنجاح</h3>
                  <p className="text-sm text-zinc-500 max-w-sm">
                    شكراً لك. تقريرك الآن في <strong>قائمة مراجعة الخبراء</strong>. 
                    المعرف الفريد: <span className="text-white font-mono text-xs">#{Math.random().toString(36).substring(7).toUpperCase()}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
                >
                  إرسال سجل آخر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-250%); }
        }
      `}</style>
    </div>
  );
};

export default ContributionPortal;
