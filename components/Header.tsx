
import React from 'react';
import { BarChart3, Map as MapIcon, Clock, MessageSquare, FileText, Upload } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'map' | 'timeline' | 'ai' | 'contribute';
  setActiveTab: (tab: 'dashboard' | 'map' | 'timeline' | 'ai' | 'contribute') => void;
  onOpenReport: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  const tabs = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'map', label: 'خريطة الأدلة', icon: MapIcon },
    { id: 'timeline', label: 'الخط الزمني', icon: Clock },
    { id: 'ai', label: 'بحث ذكي', icon: MessageSquare },
    { id: 'contribute', label: 'ساهم', icon: Upload },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-900/20 border border-red-500/50 flex items-center justify-center rounded-lg">
            <span className="text-red-500 font-bold text-xl">ش</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              شاهد غزة
              <span className="text-[10px] font-mono bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded uppercase">بيانات موثقة</span>
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">واجهة حقوق الإنسان القائمة على الحقائق</p>
          </div>
        </div>

        <div className="flex bg-[#1a1a1a] rounded-full p-1 border border-white/5 overflow-hidden">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === id 
                ? 'bg-[#333] text-white shadow-lg' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={onOpenReport}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors"
        >
          <FileText className="w-4 h-4" />
          تصدير التقرير
        </button>
      </div>
    </nav>
  );
};

export default Header;
