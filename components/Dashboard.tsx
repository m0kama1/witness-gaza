
import React from 'react';
import { METRICS } from '../constants';
import { Category, VerificationStatus } from '../types';
import { 
  Users, 
  Stethoscope, 
  Home, 
  Palmtree, 
  ArrowUpLeft, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const chartData = [
  { name: 'السكن', val: 75, color: '#3b82f6' },
  { name: 'المياه', val: 90, color: '#ef4444' },
  { name: 'الكهرباء', val: 100, color: '#f59e0b' },
  { name: 'الصحة', val: 88, color: '#10b981' },
];

const Dashboard: React.FC = () => {
  const getIcon = (category: Category) => {
    switch (category) {
      case Category.CHILDREN: return <Users className="w-5 h-5" />;
      case Category.HEALTHCARE: return <Stethoscope className="w-5 h-5" />;
      case Category.INFRASTRUCTURE: return <Home className="w-5 h-5" />;
      case Category.CULTURAL: return <Palmtree className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white">لوحة الحقيقة</h2>
        <p className="text-zinc-400 max-w-2xl">
          مؤشرات إنسانية فورية من جهات توثيق معتمدة. بياناتنا مقطوعة المصادر مع تقارير الأمم المتحدة ومنظمة الصحة العالمية.
        </p>
      </header>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <div key={metric.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${
                metric.category === Category.CHILDREN ? 'bg-red-500/10 text-red-500' :
                metric.category === Category.HEALTHCARE ? 'bg-blue-500/10 text-blue-500' :
                metric.category === Category.INFRASTRUCTURE ? 'bg-emerald-500/10 text-emerald-500' :
                'bg-amber-500/10 text-amber-500'
              }`}>
                {getIcon(metric.category)}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <ShieldCheck className="w-3 h-3" />
                {metric.status}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{metric.label}</p>
              <h3 className="text-3xl font-bold text-white group-hover:text-red-500 transition-colors">{metric.value}</h3>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-500">المصدر</span>
                <span className="text-zinc-300 font-medium">{metric.source}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-500">آخر تحديث</span>
                <span className="text-zinc-300">{metric.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">تدهور البنية التحتية (%)</h3>
            <span className="text-xs text-zinc-500 italic">بيانات تقريبية للمرجعية البصرية</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis orientation="right" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#222'}} 
                  contentStyle={{backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', textAlign: 'right'}}
                />
                <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">ملخص التوثيق</h3>
            <p className="text-sm text-zinc-400">التكلفة البشرية للنزاع تتجاوز الأرقام البسيطة. كل نقطة بيانات هنا تقابل سجلاً موثقاً في قاعدة بياناتنا.</p>
          </div>
          <div className="space-y-4 mt-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-right">
              <p className="text-xs text-zinc-500 mb-1">المرحلة الإنسانية</p>
              <p className="text-lg font-bold text-red-500">حرجة / قصوى</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-right">
              <p className="text-xs text-zinc-500 mb-1">حالة وصول الأمم المتحدة</p>
              <p className="text-lg font-bold text-amber-500">مقيدة للغاية</p>
            </div>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              تعرف على المنهجية
              <ArrowUpLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
