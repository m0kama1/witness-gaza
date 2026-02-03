
import React from 'react';
import { Incident } from '../types';
import { X, ExternalLink, ShieldCheck, Share2, Download, Scale } from 'lucide-react';

interface EvidenceCardProps {
  incident: Incident;
  onClose: () => void;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ incident, onClose }) => {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden animate-in slide-in-from-right-4 duration-300 flex flex-col h-full text-right">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900">
        <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full text-zinc-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">سجل حادثة #{incident.id.toUpperCase()}</span>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </div>
      </div>

      <div className="p-8 space-y-6 overflow-y-auto">
        <header className="space-y-2">
          <div className="flex justify-end gap-2">
             <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5 font-bold uppercase tracking-wider">{incident.category}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">{incident.title}</h3>
          <p className="text-zinc-500 text-sm flex justify-end items-center gap-2">
             {incident.location} • {incident.date}
          </p>
        </header>

        <section className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">الملخص</h4>
          <p className="text-zinc-300 leading-relaxed text-sm">
            {incident.summary}
          </p>
        </section>

        <section className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center justify-end gap-2">
            الأثر الإنساني
          </h4>
          <p className="text-zinc-300 leading-relaxed text-sm">
            {incident.impact}
          </p>
        </section>

        <section className="bg-amber-900/10 p-4 rounded-xl border border-amber-900/20 space-y-3">
          <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-end gap-2">
            سياق القانون الدولي الإنساني
            <Scale className="w-4 h-4" />
          </h4>
          <p className="text-zinc-400 leading-relaxed text-xs italic">
            {incident.legalContext}
          </p>
        </section>

        <div className="pt-6 border-t border-white/5">
           <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">التحقق والمصادر</h4>
           <div className="space-y-2">
             <div className="flex items-center justify-between text-xs p-2 bg-black/30 rounded border border-white/5">
                <span className="text-[10px] text-zinc-600">تمت المقارنة</span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">تم التحقق من قبل فريق التوثيق</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </div>
             </div>
             <p className="text-zinc-500 text-xs mt-2 text-left">المصدر: {incident.source}</p>
           </div>
        </div>
      </div>

      <div className="p-6 mt-auto border-t border-white/5 bg-zinc-900 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/5 transition-colors">
          <Share2 className="w-3 h-3" />
          مشاركة الحالة
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors">
          <Download className="w-3 h-3" />
          تصدير البطاقة
        </button>
      </div>
    </div>
  );
};

export default EvidenceCard;
