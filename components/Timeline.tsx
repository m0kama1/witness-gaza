
import React, { useState } from 'react';
import { TIMELINE } from '../constants';
import { Category } from '../types';
import { Calendar, Filter, ArrowLeft } from 'lucide-react';

const Timeline: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'الكل'>('الكل');

  const filteredTimeline = filter === 'الكل' 
    ? TIMELINE 
    : TIMELINE.filter(e => e.category === filter);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-right">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2 w-full">
          <h2 className="text-3xl font-serif font-bold text-white">الخط الزمني للأحداث</h2>
          <p className="text-zinc-400">تحليل زمني لمراحل التصعيد والأثر الإنساني.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#1a1a1a] p-1.5 rounded-xl border border-white/5 no-scrollbar overflow-x-auto">
          {['الكل', Category.HEALTHCARE, Category.DISPLACEMENT, Category.CULTURAL].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filter === cat 
                ? 'bg-white text-black' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="relative space-y-12 before:absolute before:inset-0 before:mr-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-zinc-800 before:via-zinc-800 before:to-transparent">
        {filteredTimeline.map((event, index) => (
          <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-[#0a0a0a] text-zinc-500 shadow shrink-0 md:order-1 md:group-odd:translate-x-1/2 md:group-even:-translate-x-1/2 z-10">
              <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-red-500 transition-colors"></div>
            </div>

            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl group-hover:border-white/20 transition-all text-right">
              <div className="flex items-center justify-between mb-2 flex-row-reverse">
                <time className="font-mono text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </time>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 font-bold uppercase">{event.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {event.description}
              </p>
              <button className="mt-4 text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center justify-end gap-2 hover:gap-3 transition-all">
                مشاهدة سجلات الأدلة
                <ArrowLeft className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
