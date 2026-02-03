
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Map as MapIcon, 
  Clock, 
  MessageSquare,
  AlertTriangle,
  Upload
} from 'lucide-react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GazaMap from './components/GazaMap';
import Timeline from './components/Timeline';
import AIInquiry from './components/AIInquiry';
import EvidenceCard from './components/EvidenceCard';
import ContributionPortal from './components/ContributionPortal';
import ReportGenerator from './components/ReportGenerator';
import SearchFilters from './components/SearchFilters';
import { INCIDENTS } from './constants';
import { Incident, Category, Region } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'timeline' | 'ai' | 'contribute'>('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  const filteredIncidents = useMemo(() => {
    return INCIDENTS.filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           incident.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           incident.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(incident.category);
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(incident.region);
      
      const matchesDate = (!dateRange.start || incident.date >= dateRange.start) &&
                          (!dateRange.end || incident.date <= dateRange.end);

      return matchesSearch && matchesCategory && matchesRegion && matchesDate;
    });
  }, [searchQuery, selectedCategories, selectedRegions, dateRange]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenReport={() => setShowReportModal(true)} 
      />

      {/* Global Filter Bar */}
      {activeTab !== 'ai' && activeTab !== 'contribute' && (
        <div className="bg-[#111] border-b border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <SearchFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedRegions={selectedRegions}
              setSelectedRegions={setSelectedRegions}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[600px]">
            <div className="lg:col-span-2 h-full">
              <GazaMap 
                incidents={filteredIncidents} 
                onSelectIncident={setSelectedIncident} 
              />
            </div>
            <div className="lg:col-span-1 space-y-4 h-full">
              {selectedIncident ? (
                <EvidenceCard 
                  incident={selectedIncident} 
                  onClose={() => setSelectedIncident(null)} 
                />
              ) : (
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 h-full flex flex-col justify-center items-center text-center">
                  <MapIcon className="w-12 h-12 text-zinc-600 mb-4" />
                  <h3 className="text-xl font-medium mb-2">خريطة الأدلة التفاعلية</h3>
                  <p className="text-zinc-400">
                    {filteredIncidents.length > 0 
                      ? `عرض ${filteredIncidents.length} من الحوادث المصفاة. انقر على علامة لعرض التفاصيل.`
                      : "لا توجد حوادث تطابق الفلاتر الحالية. حاول توسيع نطاق البحث."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'ai' && <AIInquiry />}
        {activeTab === 'contribute' && <ContributionPortal />}
      </main>

      {showReportModal && (
        <ReportGenerator onClose={() => setShowReportModal(false)} />
      )}

      <footer className="bg-black/50 border-t border-white/5 py-4 px-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span>تم التحقق من البيانات عبر معايير الاستخبارات مفتوحة المصدر (OSINT).</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">أخلاقيات التوثيق</a>
          <a href="#" className="hover:text-white transition-colors">المساهمة بالبيانات</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
